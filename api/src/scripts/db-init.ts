import { PrismaClient } from '@prisma/client';

async function main() {
  console.log('Starting database initialization...');

  try {
    console.log('Connecting to database using URL:', process.env.DATABASE_URL);
    const prisma = new PrismaClient();

    // Connect to the database
    await prisma.$connect();
    console.log('Connected to the database successfully');

    // Create a default admin user if none exists
    const adminExists = await prisma.user.findFirst({
      where: {
        role: 'admin'
      }
    });

    if (!adminExists) {
      console.log('Creating default admin user...');
      await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: 'admin123', // In production, this should be hashed
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin'
        }
      });
      console.log('Default admin user created successfully');
    } else {
      console.log('Admin user already exists, skipping creation');
    }

    await prisma.$disconnect();
    console.log('Database initialization completed successfully');
    
  } catch (error) {
    console.error('Error during database initialization:', error);
    process.exit(1);
  }
}

main();