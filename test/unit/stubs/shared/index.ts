import { IJwtPayload } from '@/infra/jwt/protocol/jwt.payload.protocol';
import { MessageDto } from '@/presentation/dtos/shared/message.dto';

// poderia devolver direto o objeto, mas eu acho melhor manter o padrão de factory.
const dateDummy = new Date('04/28/2000');
const idDummy = (() => Math.floor(Math.random() * 10))();

export const jwtPayloadStub = (): IJwtPayload => ({
  userId: 2,
});

export const messageDtoStub = (): MessageDto => ({
  message: 'Logout success',
  status: 204,
});

export const imageStub = () => ({
  buffer: Buffer.from([]),
  filename: 'photo.jpg',
  originalname: 'photo',
  stream: null,
  size: 720,
  mimetype: 'jpg',
  fieldname: 'photo',
  path: 'stub/photo.jpg',
  encoding: 'utf-8',
  destination: 'somewhere',
});

export const tokenDummy = () => 'ey.fkfofkeofkeofkocxofjmeorkeofkeofkalgumacoisa';

export const DateStub = () => dateDummy;

export const randomIdStub = () => idDummy;
