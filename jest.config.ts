import type { Config } from '@jest/types';
import { jestBaseConfig } from './jest.base.setup';

const jestUnitConfig: Config.InitialOptions = {
  testRegex: '.*\\.spec\\.ts$',
};

export default async (): Promise<Config.InitialOptions> => Object.assign(jestUnitConfig, jestBaseConfig);
