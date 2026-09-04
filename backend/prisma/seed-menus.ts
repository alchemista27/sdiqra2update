import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.deleteMany(); // clear existing

  const m1 = await prisma.menuItem.create({ data: { label: 'Tentang Sekolah', url: '/tentang-sekolah', order: 1 } });
  await prisma.menuItem.create({ data: { label: 'Sambutan Kepala Sekolah', url: '/tentang-sekolah/sambutan', order: 1, parentId: m1.id } });
  await prisma.menuItem.create({ data: { label: 'Berita', url: '/berita', order: 2 } });
  await prisma.menuItem.create({ data: { label: 'Kontak', url: '/kontak', order: 3 } });
  console.log('Menus seeded!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
