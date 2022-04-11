// poderia devolver direto o objeto, mas eu acho melhor manter o padrão de factory.

import { randomUUID } from 'crypto';

const dateDummy = new Date('04/28/2000');
const uuidDummy = randomUUID();

export const DateStub = () => dateDummy;

export const randomIdStub = () => uuidDummy;
