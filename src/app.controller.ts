import { Controller, Render, Param, Body, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import FormData from './formdata';
import { title } from 'process';
import MsgData from './Msgdata';

const msgs: MsgData[] = []
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

  @Get()
  @Render('index')
  index() {
    console.log(msgs)
    return {
      title: 'Nest-JS-MVC',
      message: 'NestJS + hbs = MVC application!',
      data: msgs
    }
  }

  @Post()
  @Render('index')
  form(@Body() msg:MsgData) {
    msg.posted = new Date()
    msgs.unshift(msg)
    return {
      title: 'NestJS-MVC',
      message: 'posted:' + JSON.stringify(msg),
      data:msgs
    }
  }

  @Post('/hello/post')
  post(@Body() frm:FormData): string {
    this.appService.addData(frm)
    return 'form data was pushed!'
  }
}
