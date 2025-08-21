import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Store)
    private storeRepo: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    // 1. 유저 존재 여부 확인
    const user = await this.userRepo.findOne({
      where: { userId: createStoreDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createStoreDto.userId} not found`,
      );
    }

    // 2. Store 엔티티 생성
    const store = this.storeRepo.create({
      name: createStoreDto.name,
      address: createStoreDto.address,
      postNum: createStoreDto.postNum,
      tel: createStoreDto.tel,
      businessNum: createStoreDto.businessNum,
      desc: createStoreDto.desc,
      imgUrl: createStoreDto.imgUrl,
      owner: user,
    });

    // 3. DB 저장
    return await this.storeRepo.save(store);
  }

  async findAll(): Promise<Store[]> {
    return this.storeRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
