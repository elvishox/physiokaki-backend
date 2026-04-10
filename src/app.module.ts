import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { ModulesModule } from './modules/modules.module';
import { ProgressModule } from './progress/progress.module';
import { UsersModule } from './users/users.module';

const databaseConfig: TypeOrmModuleOptions = process.env.DATABASE_URL
  ? {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }
  : {
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    };

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    FlashcardsModule,
    ModulesModule,
    ProgressModule,
    UsersModule,
  ],
})
export class AppModule {}
