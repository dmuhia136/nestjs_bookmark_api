import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(dto: AuthDto) {
    //find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email.toString(),
      },
    });
    //if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    //compare password
    const pwMatches = await argon.verify(user.hash, dto.password.toString());
    if (!pwMatches) {
      throw new ForbiddenException('Password incorrect');
    }
    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDto) {
    //generate the password
    const hash = await argon.hash(dto.password.toString());

    //save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email.toString(),
          hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }

    //return the saved user
  }
  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    var token = {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.get('JTW_SECRET'),
      }),
    };
    return token;
  }
}
