import { Body, Controller, Get, OnModuleInit, Param, Post } from '@nestjs/common';
import { DispatchersService } from './dispatchers.service';
import { CreateDispatcherDto } from './dto/create-dispatcher.dto';
import { Dispatcher } from './entity/dispatcher.entity';
import { Kafka } from 'kafkajs';

@Controller('dispatchers')
export class DispatchersController implements OnModuleInit {

    private readonly Kafka = new Kafka({brokers:[`3.0.159.213:9092`]});
    private readonly producer = this.Kafka.producer();
    private readonly consumer = this.Kafka.consumer({groupId: "thilini-dispatcher-service"});
         
    constructor(private readonly dispatcherService: DispatchersService) {}
    onModuleInit() {
        this.consumer.connect();
        this.consumeOrderConfirmed();
       // throw new Error('Method not implemented.');
    }

  @Post()
  async createCustomer(
    @Body() createDispatcherDto: CreateDispatcherDto,
  ): Promise<Dispatcher> {
    return this.dispatcherService.create(createDispatcherDto);
  }

  @Get(':city')
  async getDispatcherByCity(@Param('city') city: string): Promise<Dispatcher[]> {
    return this.dispatcherService.getDispatcherByCity(city);
  }

  async consumeOrderConfirmed(){
    console.log('subscription to order confirmed ===========================================>')
    await this.consumer.subscribe({topic:`thilini.order.confirmed`});

    await this.consumer.run({
      eachMessage: async ({message} )=> {
        console.log(`order successfully created----------------`);
        const {customerName,savedOrder,savedOrderItems} = JSON.parse(message.value?.toString() || "Default value if null");

        console.log(customerName,savedOrder,savedOrderItems);


      }
    })
  }

}
