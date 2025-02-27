import { IsEnum } from "class-validator";
import { Order } from "../entity/order.entity";

export enum OrderStatus{
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export class UpdateOrderStatus {
    @IsEnum(OrderStatus)
    status: OrderStatus;

}