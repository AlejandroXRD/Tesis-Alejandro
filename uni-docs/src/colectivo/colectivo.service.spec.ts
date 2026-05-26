import { Test, TestingModule } from '@nestjs/testing';
import { ColectivoService } from './colectivo.service';

describe('ColectivoService', () => {
  let service: ColectivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColectivoService],
    }).compile();

    service = module.get<ColectivoService>(ColectivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
