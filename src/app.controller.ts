import { Controller, Param, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHelloDefault(): object {
    return this.appService.getHello(0);
  }

  @Get('/hello/:id')
  getHelloById(@Param('id') id: string): object {
    return this.appService.getHello(Number(id));
  }
}
