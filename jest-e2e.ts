import type { Config } from '@jest/types';
import { jestBaseConfig } from './jest.base.setup';

const jestE2EConfig: Config.InitialOptions = {
  testRegex: '.e2e-spec.ts$',
};

export default async (): Promise<Config.InitialOptions> => Object.assign(jestE2EConfig, jestBaseConfig);
