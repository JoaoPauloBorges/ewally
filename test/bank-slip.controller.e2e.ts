import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';
import { GetInfoFromDigitableLineDto } from '@app/bank-slips/dto/get-info-from-digitable-line.dto';

describe('BankSlipsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/boleto (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(302);
  });

  describe('Given a call to /boleto (GET)', () => {
    describe('When the digitable code is valid and it is from a bank-slip type', () => {
      const digitableline = '21290001192110001210904475617405975870000002000';

      it('should respond with the correct barcode, amount, and due date', () => {
        return request(app.getHttpServer()).get(`/boleto/${digitableline}`).expect(200).expect({
          barCode: '21299758700000020000001121100012100447561740',
          amount: 20,
          expirationDate: '2018-07-16',
        });
      });
    });

    describe('When the digitable code is valid and it is from a bill type', () => {
      const digitableline = '858200000260178601801205529544183860673925100017';

      it('should respond with the correct barcode and amount', () => {
        return request(app.getHttpServer())
          .get(`/boleto/${digitableline}`)
          .expect(200)
          .expect({
            barCode: '85820000026178601801205295441838667392510001',
            amount: 2617.86,
          } as GetInfoFromDigitableLineDto);
      });
    });
  });
});
