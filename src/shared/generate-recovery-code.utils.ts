import { randomUUID } from 'crypto';

export const generateRecoveryCode = () => randomUUID().substring(0, 8);
