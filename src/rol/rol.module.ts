import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { DatabaseModule } from 'src/config/database.module';
import { rolProviders } from './rol.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RolController],
  providers: [RolService, ...rolProviders],
  exports: [RolService, ...rolProviders ],
})
export class RolModule {}
