import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  nuevoEndpoint(): string {
    return 'Soy nuevo';
  }

  // A comparación de express, con Nest funciona con o sin slash final
  @Get('/ruta/')
  ruta() {
    return 'con /.../';
  }
}
