import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  // Create admin user
  const adminPassword = await bcrypt.hash('adminpassword', saltRounds);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin User',
      role: UserRole.ADMIN,
    },
  });

  console.log({ admin });

  // Create regular user
  const userPassword = await bcrypt.hash('userpassword', saltRounds);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      name: 'Regular User',
      role: UserRole.USER,
    },
  });

  console.log({ user });

  // Create concerts
  const concert1 = await prisma.concert.create({
    data: {
      name: 'Summer Rock Festival',
      description:
        'A thrilling rock concert featuring top bands from around the world.',
      totalSeats: 1000,
    },
  });

  const concert2 = await prisma.concert.create({
    data: {
      name: 'Classical Night',
      description:
        'An evening of beautiful classical music performed by a renowned orchestra.',
      totalSeats: 500,
    },
  });

  console.log({ concert1, concert2 });

  // Create reservations
  const reservation1 = await prisma.reservation.create({
    data: {
      userId: user.id,
      concertId: concert1.id,
    },
  });

  const reservation2 = await prisma.reservation.create({
    data: {
      userId: admin.id,
      concertId: concert2.id,
    },
  });

  console.log({ reservation1, reservation2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
