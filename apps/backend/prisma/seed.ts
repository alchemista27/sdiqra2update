import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  const email = 'admin@sditiqra2kotabengkulu.sch.id';
  const plainPassword = 'Iqra2Admin!123';
  
  await prisma.user.upsert({
    where: { email },
    update: { password: hashPassword(plainPassword), role: 'SUPER_ADMIN', isActive: true },
    create: {
      id: 'cmn7ndrp20000ckysnblno9n2', // keep same id
      name: 'Super Administrator',
      email,
      password: hashPassword(plainPassword),
      role: 'SUPER_ADMIN',
      isActive: true,
    }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
