import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/presentation/controllers/app.controller';
import { AppService } from '@/application/services/app.service';

describe('<AppController>', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return "API OPEN!"', () => {
    expect(appController.getHello()).toBe('API OPEN');
  });
});
