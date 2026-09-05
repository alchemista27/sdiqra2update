import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  const email = 'admin@iqra2.sch.id';
  const plainPassword = 'Iqra2Admin!123';
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    await prisma.user.update({
      where: { email },
      data: { password: hashPassword(plainPassword), role: 'SUPER_ADMIN' }
    });
    console.log('Admin user updated with new password.');
  } else {
    await prisma.user.create({
      data: {
        id: 'user_superadmin_001',
        name: 'Super Administrator',
        email,
        password: hashPassword(plainPassword),
        role: 'SUPER_ADMIN',
        isActive: true,
      }
    });
    console.log('Super Admin user created successfully.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
