import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signin-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.userRepo.save({
      ...createUserDto,
    });
    return result;
  }

  async validateUser(signInDto: SignInDto) {
    const user = await this.userRepo.findOne({
      where: { userId: signInDto.userId, password: signInDto.password },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = user?.password === signInDto.password;
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    return { userId: user?.userId, userName: user?.name };
  }

  async logoutUser(signOutDto: SignInDto) {
    //토큰 삭제 로직
  }

  async findAll(): Promise<User[]> {
    const result = await this.userRepo.find();
    return result;
  }

  async findOne(id: string): Promise<User | null> {
    const result = await this.userRepo.findOne({ where: { userId: id } });

    return result;
  }

  async update(id: number, updateUserDto: {}): Promise<{ message: string }> {
    const result = await this.userRepo.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return { message: `User ${id} updated` };
  }

  async remove(id: number): Promise<any> {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return { message: `User ${id} updated` };
  }
}
