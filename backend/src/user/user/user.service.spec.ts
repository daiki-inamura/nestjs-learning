import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
import { Userdata } from 'src/entities/userdata.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  merge: jest.fn(),
});

let service: UserService;
let repo: MockRepository<Userdata>;

beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    providers: [
        UserService,
        {
            provide: getRepositoryToken(Userdata),
            useValue: createMockRepository<Userdata>(),
        },
    ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<MockRepository<Userdata>>(getRepositoryToken(Userdata));
});


describe('getAll', () => {
    it('全ユーザーを返す', async () => {
        const users: Userdata[] = [];
        repo.find!.mockResolvedValue(users);
        await expect(service.getAll()).resolves.toEqual(users);
    });
});

describe('create', () => {
    it('新規ユーザーを追加して返す', async () => {
        const dto = { name: 'Test User' } as any;
        const tmp = { id: 1, ...dto } as Userdata;
        repo.create!.mockReturnValue(tmp);
        repo.save!.mockResolvedValue(tmp);

        await expect(service.create(dto)).resolves.toEqual(tmp);
        expect(repo.create).toHaveBeenCalledWith(dto);
        expect(repo.save).toHaveBeenCalledWith(tmp);
    });
});

describe('remove', () => {
    it('存在しないIDなら例外', async () => {
        repo.delete!.mockResolvedValue({ affected: 0 });
        await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
});

