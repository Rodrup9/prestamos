import { Module } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { DireccionController } from './direccion.controller';
import { DatabaseModule } from 'src/config/database.module';
import { direccionProviders } from './direccion.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DireccionController],
  providers: [DireccionService, ...direccionProviders],
  exports: [DireccionService, ...direccionProviders]
})
export class DireccionModule {}
