import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator'

export class CreateUserDto {
  @IsInt()
  @IsPositive()
  id: number

  @IsString()
  @IsNotEmpty()
  userName: string

  @IsUrl()
  @IsOptional()
  avatarUrl?: string
}
