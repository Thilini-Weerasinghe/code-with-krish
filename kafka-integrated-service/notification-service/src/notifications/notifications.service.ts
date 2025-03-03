import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationsService implements OnModuleInit  {
// private readonly Kafka = new Kafka({brokers:[`3.0.159.213:9092`]});
  private readonly Kafka = new Kafka({brokers:[`localhost:9092`]});
  private readonly producer = this.Kafka.producer();
  private readonly consumer = this.Kafka.consumer({groupId: "thilini-notification-service"});
   
  async onModuleInit() {

       await this.consumer.connect();
       await this.consumeOrderConfirmed();
        //throw new Error('Method not implemented.');
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
