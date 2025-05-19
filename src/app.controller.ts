import { Controller, Param, Body, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import FormData from './formdata';

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

  @Post('/hello/post')
  post(@Body() frm:FormData): string {
    this.appService.addData(frm)
    return 'form data was pushed!'
  }
}
