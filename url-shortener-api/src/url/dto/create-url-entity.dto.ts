import { IsUrl } from 'class-validator';

export class CreateUrlEntityDto {
  @IsUrl()
  readonly url: string;
}
