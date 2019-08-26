import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
     {message : 'password is too weak'})
    password: string;

}
