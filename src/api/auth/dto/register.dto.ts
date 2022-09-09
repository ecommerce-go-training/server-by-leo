import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Gender } from '@/common/enums';
import { IsOnlyDate, IsValidGender } from '@/decorators';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ format: 'password', example: 'P@ssw0rd' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Lorem' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Lorem' })
  lastName: string;

  @IsOptional()
  @IsOnlyDate()
  @ApiProperty({
    format: 'date',
    required: false,
  })
  bod?: Date;

  @IsOptional()
  @IsValidGender()
  @ApiProperty({
    enum: Gender,
    required: false,
  })
  gender?: Gender;

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  @ApiProperty({ example: '0123456789' })
  phoneNumber: string;
}
