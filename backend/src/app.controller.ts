import { Controller, Render, Param, Body, Get, Post, Session } from '@nestjs/common';
import { AppService } from './app.service';
import FormData from './formdata';
import { title } from 'process';
import MsgData from './Msgdata';
import session from 'express-session';

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
  index(@Session() session: Record<string, any>) {
    const username = session.username ? session.username : '（未入力）'
    console.log(msgs)
    return {
      title: 'Nest-JS-MVC',
      message: 'Username: ' + username,
      username: session.username,
      // message: 'NestJS + hbs = MVC application!',
      data: msgs
    }
  }

  @Post()
  @Render('index')
  form(@Body() msg:MsgData, @Session() session: Record<string, any>) {
    msg.posted = new Date()
    session.username = msg.name
    msgs.unshift(msg)
    return {
      title: 'NestJS-MVC',
      message: 'posted:' + JSON.stringify(msg),
      username: session.username,
      data:msgs
    }
  }

  @Post('/hello/post')
  post(@Body() frm:FormData): string {
    this.appService.addData(frm)
    return 'form data was pushed!'
  }
}
