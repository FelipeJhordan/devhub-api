// poderia devolver direto o objeto, mas eu acho melhor manter o padrão de factory.

import { randomUUID } from 'crypto';

const date = new Date('04/28/2000');
const uuid = randomUUID();

export const mockDate = () => date;

export const randomId = () => uuid;
