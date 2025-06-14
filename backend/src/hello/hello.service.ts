import { Injectable } from '@nestjs/common';

// /helloにアクセスしたとき返却する文字列
@Injectable()
export class HelloService {
    getHello(): string {
        return 'こんにちは、NestJS！';
    } 

    getHelloById(id:number): string {
        const name = ['太郎', '二郎', '三郎']
        const index = id >= 0 && id < name.length ? id : 0;
        return `こんにちは、${name[index]}さん！`;
    }

}

