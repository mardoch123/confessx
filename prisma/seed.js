const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Vérifier si l'admin existe déjà
  const adminExists = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  });

  if (!adminExists) {
    // Créer l'admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await prisma.user.create({
      data: {
        name: 'Administrateur',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      }
    });
    
    console.log('Compte administrateur créé avec succès');
  } else {
    console.log('Le compte administrateur existe déjà');
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