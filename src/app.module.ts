import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { MenuModule } from './menu/menu.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { OwnerUser } from './user/entities/user.entity';
import { OwnerStore } from './store/entities/store.entity';
import { OwnerMenu } from './menu/entities/menu.entity';
import { OwnerGroup } from './group/entities/group.entity';
import { OwnerOption } from './option/entities/option.entity';
import { OwnerMenuGroup } from './group/entities/menuGroup.entity';
import { OwnerGroupOption } from './group/entities/groupOption.entity';

import { GroupModule } from './group/group.module';
import { OptionModule } from './option/option.module';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';

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
      database: 'toast',
      entities: [
        OwnerUser,
        OwnerStore,
        OwnerMenu,
        OwnerGroup,
        OwnerMenuGroup,
        OwnerOption,
        OwnerGroupOption,
      ],
      synchronize: true,

      // ✅ connection pool 옵션
      extra: {
        connectionLimit: 10, // 풀의 최대 커넥션 개수
      },
    }),
    MulterModule.register({
      dest: './uploads', // 저장 경로
    }),
    UserModule,
    MenuModule,
    AuthModule,
    StoreModule,
    GroupModule,
    OptionModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
