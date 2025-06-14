import { Controller, Get, Param } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello2')
export class HelloController {
    constructor(private readonly helloService: HelloService){}

    @Get()
    getHello(): string {
        return this.helloService.getHello();
    }

    @Get(':id')
    getHelloById(@Param('id') id: string): string {
        return this.helloService.getHelloById(Number(id));
    }
}
