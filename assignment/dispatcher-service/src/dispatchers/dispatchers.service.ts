import { Injectable } from '@nestjs/common';
import { CreateDispatcherDto } from './dto/create-dispatcher.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispatcher } from './entity/dispatcher.entity';

@Injectable()
export class DispatchersService {

    constructor(
        @InjectRepository(Dispatcher)
        private readonly dispatcherRepository : Repository<Dispatcher>
    ){}
    
    async create(createDispatcherDto: CreateDispatcherDto):Promise<Dispatcher> {
            const dispatcher = this.dispatcherRepository.create(createDispatcherDto);
         return this.dispatcherRepository.save(dispatcher);
        //throw new Error('Method not implemented.');
    }

    async getDispatcherByCity(city: string): Promise<Dispatcher[]> {
         
        return await this.dispatcherRepository.find({ where: { city }});
        

      }
}
