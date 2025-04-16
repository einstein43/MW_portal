import { PrismaClient } from '@prisma/client';

// Create the PrismaClient instance outside of any function
// to ensure it's properly initialized
const prismaClientSingleton = () => {
  return new PrismaClient({
    errorFormat: 'pretty',
    log: ['info', 'warn', 'error'],
  });
};

// Create a global singleton variable to hold our Prisma instance
const globalForPrisma = globalThis as unknown as { prisma: ReturnType<typeof prismaClientSingleton> };
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Set the global object in a non-production environment
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function main() {
  console.log('Starting database initialization...');

  try {
    console.log('Connecting to database using URL:', process.env.DATABASE_URL);
    
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
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Ensure we don't run the script until the main module is loaded
if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}