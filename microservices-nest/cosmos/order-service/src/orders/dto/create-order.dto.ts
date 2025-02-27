import { Type } from "class-transformer";
import { IsArray, IsIn, IsInt, ValidateNested } from "class-validator";

class OrderItemsDto{
    @IsInt()
    productId:number;
    @IsInt()
    price:number;
    @IsInt()
    quantity:number;
}
export class CreateOrderDto{
    @IsInt()
    customerId:number;

    @IsArray()
    @ValidateNested({each:true})
    @Type(() => OrderItemsDto)
    items: OrderItemsDto[];
}