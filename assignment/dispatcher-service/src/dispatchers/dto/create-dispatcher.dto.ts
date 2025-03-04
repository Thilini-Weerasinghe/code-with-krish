import { IsNotEmpty, IsString } from "class-validator";

export class CreateDispatcherDto {
    @IsString()
    @IsNotEmpty()
    vehicle_number: string;
  
    @IsString()
    @IsNotEmpty()
    city: string;
  
  }
  