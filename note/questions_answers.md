# 質問と回答まとめ（2025年5月28–29日）

以下は NestJS 学習中に発生したエラーとその対策をまとめたものです。

---

## 質問1（5/28）
**コンパイル時に大量のエラー**  
```text
TS2304: Cannot find name 'Sampledata'.
TS2300: Duplicate identifier 'SampledataService' / 'SampledataController'.
TS2307: Cannot find module 'src/entities/sampledata.entity'.
TS1005 / TS1068: 構文エラー in Promise<Sampledata{}> など
TS2532: Object is possibly 'undefined'.
```

**回答**  
- `src/entities/sampledata.entity.ts` を作成  
- 各ファイルで相対パス（`../entities/sampledata.entity`）を正しく指定  
- 重複していた `import` を削除  
- サービス・コントローラの戻り型を `Promise<Sampledata[]>` など適切に修正  
- コントローラでも `import { Sampledata }` を追加  

---

## 質問2（5/28）
**TS2307: Cannot find module '../entities/sampledata.entity'**

**回答**  
- `src/entities/sampledata.entity.ts` の存在を確認  
- フォルダ構成に応じてパスを `./sampledata.entity` などに書き換え  
- 必要に応じて `tsconfig.json` の `baseUrl` / `paths` を設定  

---

## 質問3（5/28）
**起動時のドライバーエラー**  
```text
MissingDriverError: Wrong driver: "undefined" given.
```

**回答**  
- `TypeOrmModule.forRoot()` に `type` が未指定  
- 直接オプションに `type: 'mysql'` などを渡すか、`ormconfig.json`／`.env`＋`forRootAsync()` を使用  
- `npm install mysql2` または `npm install sqlite3` などドライバをインストール  

---

## 質問4（5/28）
**使用するのは sqlite3 です**

**回答**  
```ts
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: join(__dirname, '..', 'data', 'db.sqlite'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
})
```  
とし、`npm install sqlite3` を実行  

---

## 質問5（5/28）
**TS2307: Cannot find module '@nestjs/config'**

**回答**  
- 環境変数モジュールを使うなら `npm install @nestjs/config`  
- 不要なら `import { ConfigModule } from '@nestjs/config';` を削除  

---

## 質問6（5/28）
**起動ログが正常か？**  
```
Found 0 errors. …
Nest application successfully started
```

**回答**  
- エラーがなく各モジュール・コントローラがロードされていれば正常起動  

---

## 質問7（5/28）
**404 (Not Found) エラー**  
```
Failed to load resource: the server responded with a status of 404 (Not Found)
```

**回答**  
- `http://localhost:3000/sampledata.html` は静的ファイルも API ルートも未定義  
- 静的ファイルなら `public/sampledata.html` に配置  
- API なら `GET /sampledata` / `POST /sampledata/add` を呼び出す  

---

## 質問8（5/28）
**Controller コード例**  
```ts
@Controller('sampledata')
export class SampledataController {
  @Get('/') root()…
  @Post('/add') async add(@Body() data: Sampledata)…
}
```

**回答**  
- `/sampledata.html` は ServeStatic の `public` 配下かルート定義にないため 404  
- 静的ファイルを返すなら `public/sampledata.html`、API 呼び出しは拡張子なしで `/sampledata`  

---

## 質問9（5/29）
**getById(id) 実装時の型エラー**  
```text
TS2322: Type 'Sampledata | null' is not assignable to type 'Sampledata'.
TS2559: Type 'number' has no properties in common with type 'FindOneOptions<Sampledata>'.
```

**回答**  
- `findOneBy({ id })` または `findOne({ where: { id } })` を使用  
- 戻り値を `Promise<Sampledata | null>` にするか、`null` 時に `NotFoundException` を投げる  

---

## 質問10（5/29）
**Cannot find name 'NotFoundException'**

**回答**  
```ts
import { Injectable, NotFoundException } from '@nestjs/common';
```  
