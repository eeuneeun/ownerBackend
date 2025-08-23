import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { MenuModule } from './menu/menu.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './user/entities/user.entity';
import { Store } from './store/entities/store.entity';
import { Menu } from './menu/entities/menu.entity';
import { GroupModule } from './group/group.module';
import { OptionModule } from './option/option.module';
import { Group } from './group/entities/group.entity';
import { Option } from './option/entities/option.entity';
import { MenuGroup } from './group/entities/menuGroup.entity';
import { GroupOption } from './group/entities/groupOption.entity';

// 명령어
// $ npx @nestjs/cli g resource [패키지 이름]

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'merchant',
      entities: [User, Store, Menu, Group, MenuGroup, Option, GroupOption],
      synchronize: true,

      // ✅ connection pool 옵션
      extra: {
        connectionLimit: 10, // 풀의 최대 커넥션 개수
      },
    }),
    UserModule,
    MenuModule,
    AuthModule,
    StoreModule,
    GroupModule,
    OptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
