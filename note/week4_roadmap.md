## ✅ Week 4：ユニットテスト（Jest）導入と基本

### 📚 学習内容
- Jest と `@nestjs/testing` のセットアップ  
- テストファイル構成と基本のテスト実行方法  
- Service レイヤーのユニットテスト（Repository のモック化）  
- Controller レイヤーのユニットテスト（`ValidationPipe` 適用を含む）  
- Spy / Mock を使った挙動検証  
- テストカバレッジ取得と分析

### 📝 ToDoリスト
- [ ] **Jest 環境構築**  
  ```bash
  npm install --save-dev jest @types/jest ts-jest @nestjs/testing
  npx ts-jest config:init
  ```
  - `jest.config.js` が生成されていることを確認  
  - `package.json` に以下のスクリプトを追加／確認  
    ```jsonc
    {
      "scripts": {
        "test": "jest",
        "test:watch": "jest --watch",
        "test:cov": "jest --coverage"
      }
    }
    ```
- [ ] **「Hello World」テスト作成**  
  - `src/app.spec.ts` を作成し、以下のようなシンプルテストを記述  
    ```ts
    describe('Sample Test', () => {
      it('should return true', () => {
        expect(true).toBe(true);
      });
    });
    ```
  - ターミナルで `npm run test` を実行し、パスすることを確認
- [ ] **Service のユニットテスト**  
  - `UserService` に対して、同階層に `user.service.spec.ts` を作成  
  - TypeORM の `Repository` をモック化するユーティリティを用意  
    ```ts
    import { Repository } from 'typeorm';
    type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
    const createMockRepository = <T = any>(): MockRepository<T> => ({
      findOne: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
      // 必要に応じてメソッドを追加
    });
    ```
  - `update`, `getAll`, `create`, `delete` など各メソッドについて、「正常系」「NotFoundException 投出」「その他エラー」を網羅的にテスト
- [ ] **Controller のユニットテスト**  
  - `UserController` に対して `user.controller.spec.ts` を作成  
  - Service をモックして、「正しく `service.update`（または他メソッド）が呼ばれるか」「バリデーションエラーで 400 が返るか」を検証  
  - テスト時にもバリデーションを通すには、`overridePipe(ValidationPipe)` を使う  
- [ ] **Spy / Mock を使った挙動検証の強化**  
  - `jest.spyOn(repo, 'save')` や `jest.fn()` を使って呼び出し回数や引数を検証するテストを追加  
  - 例：「既存ユーザーが存在する場合は `merge` → `save` が呼ばれる」「存在しない場合は例外が投げられて `save` が呼ばれない」といったフローを検証
- [ ] **テストカバレッジ取得と分析**  
  - `npm run test:cov` を実行し、生成されたレポート（`coverage/lcov-report/index.html` など）を確認  
  - カバレッジが 80% 以上になるように、テストが不足している部分を補う  
  - カバレッジ閾値を `jest.config.js` 内で設定（例：`coverageThreshold`）して自動チェックする

### 🧠 復習問題
1. **NestJS でユニットテストを実行するために必要なライブラリは？**  
2. **Service レイヤーのユニットテストで、TypeORM の `Repository` をモック化する方法は？**  
3. **Controller のユニットテストで `ValidationPipe` を適用するにはどうすればよい？**  
4. **テストカバレッジを取得するコマンドと、カバレッジの閾値を設定する方法は？**
