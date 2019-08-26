import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor(
     @InjectRepository(UserRepository)
     private userRepository: UserRepository,
 ) {
     super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: 'itsasecret',
     });
 }

    async validate(payload: JwtPayload): Promise<User>{
        const { username } = payload;
        const user = await this.userRepository.findOne({ username});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
