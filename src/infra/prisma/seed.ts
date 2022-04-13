import { PrismaClient } from '@prisma/client';
import { languages } from './seeds/language.seed';
const prisma = new PrismaClient();

async function main() {
  if (await verifyIfHasLanguage()) {
    for (const language of languages) {
      await prisma.language.create({
        data: language,
      });
    }
  }
}

async function verifyIfHasLanguage(): Promise<boolean> {
  return !(await prisma.language.findFirst());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
