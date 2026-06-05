import { Test, TestingModule } from '@nestjs/testing';
import { ColectivoController } from './colectivo.controller';
import { ColectivoService } from './colectivo.service';

describe('ColectivoController', () => {
  let controller: ColectivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColectivoController],
      providers: [ColectivoService],
    }).compile();

    controller = module.get<ColectivoController>(ColectivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
