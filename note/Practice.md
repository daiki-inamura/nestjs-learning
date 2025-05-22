# NestJS + TypeORM 学習ロードマップ（3週間）  
使用書籍：『Node.jsフレームワーク超入門』  
対象：第6章 NestJS、第5章 TypeORM（必要に応じて）

---

## ✅ Week 1：NestJSの構造とルーティングを理解する

### 📚 学習内容
- Nest CLIでのプロジェクト作成（`nest new`）
- モジュール・コントローラ・サービスの基本構造
- ルーティング（@Controller, @Get, @Param）
- 依存性注入（DI）とデコレーターの役割

### 📝 ToDoリスト
- [x] Nest CLIのインストールとプロジェクト作成
- [x] AppControllerにルーティングを追加（例：`GET /hello`）
- [x] Serviceでデータ生成・加工処理を作成
- [x] `@Param()` を使ったルートパラメータの受け取り

### 🧠 復習問題
1. Nest CLIで新しいプロジェクトを作成するコマンドは？
2. `@Controller()` と `@Get()` の役割は？
3. サービスクラスをコントローラに注入（DI）するにはどう書く？
4. `@Param()` デコレーターは何に使う？

### 復習問題　回答
1. nest new アプリケーション
2. `@Controller()`：app.controller.tsで記述するデコレータ。クラスがコントローラーであることを指定する。\n
   `@Get()`：このメソッドがHTTPプロトコルのGETメソッドによって呼び出されるアクションを示す。
3. `constructor(private readonly appService: AppService) {}` で自動注入される
4. `@param()`：引数がパラメーターであることを指定するもの。

### 🧪 確認用ミニ課題
**課題：`/hello` にアクセスすると「こんにちは、NestJS！」を返すAPIを作成せよ。**
- `HelloController` を作成し、`GET /hello` を追加
- `HelloService` に処理を切り出して注入
- URLパラメータ `:id` を受け取り、条件でレスポンスを変えるルートも作成

---

## ✅ Week 2：TypeORMを使ったDB連携とCRUDの基本

### 📚 学習内容
- TypeORMの導入と設定（SQLiteでOK）
- Entityクラスの作成とマッピング（`@Entity`, `@Column`, etc.）
- Repositoryパターンでデータ操作（`find`, `save`, `remove`）
- Controller経由でデータの登録・取得・削除

### 📝 ToDoリスト
- [ ] `@nestjs/typeorm`, `typeorm`, `sqlite3` を導入
- [ ] `User` エンティティの作成（id, name, age など）
- [ ] `GET /users`, `POST /users`, `DELETE /users/:id` を作成
- [ ] サービス層でリポジトリを使ってDB操作を実装

### 🧠 復習問題
1. NestJSでTypeORMを使うために必要なパッケージは？
2. `@Entity()`、`@Column()` の意味と用途は？
3. Repositoryパターンとは何ですか？
4. データベースにレコードを追加・取得する関数は？

### 🧪 確認用ミニ課題
**課題：「ユーザー管理API」を作成せよ**
- `User` エンティティ（`id`, `name`, `age`）を作成
- 以下のエンドポイントを実装：
  - `GET /users`：全ユーザー取得
  - `POST /users`：新規ユーザー追加
  - `DELETE /users/:id`：指定IDの削除
- Postmanで各APIを確認

---

## ✅ Week 3：DTO・バリデーションとエラー処理

### 📚 学習内容
- DTO（Data Transfer Object）でデータ受け取りの型定義
- `class-validator`によるバリデーションの導入
- エラーハンドリング（400, 404）
- `PUT`による更新処理の追加

### 📝 ToDoリスト
- [ ] DTOクラスの作成（`CreateUserDto`, `UpdateUserDto`）
- [ ] `@Body()` + DTO + `ValidationPipe` を適用
- [ ] `PUT /users/:id` の更新処理を作成
- [ ] 存在しないIDに対して404エラーを返すようにする

### 🧠 復習問題
1. DTOとは何をするためのもの？
2. NestJSでバリデーションを行うには何のライブラリが必要？
3. `@IsString()` や `@IsInt()` はどこで使う？
4. 存在しないIDでアクセスされたときの処理はどう書く？

### 🧪 確認用ミニ課題
**課題：「ユーザー更新API」を追加し、バリデーションを導入せよ**
- `PUT /users/:id`：ユーザー情報の更新
- DTOと `ValidationPipe` を使って入力値を検証
- エラーハンドリング：ユーザーが存在しない場合は `404` を返す

---

## 🎯 最終目標
NestJSとTypeORMを使って、以下の要素を備えたREST APIを構築できるようにする：

- コントローラ・サービス・エンティティの分離
- GET / POST / PUT / DELETE によるデータ操作
- DTOとバリデーションの導入
- エラーハンドリングとレスポンス設計

