import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

// 1. Cargar las variables del archivo .env
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres", // <-- Cambiado de sqlite a postgres
  url: process.env.DATABASE_URL, // <-- Ahora usa la URL de Supabase que pusiste en el .env
  entities: [path.join(__dirname, '../**/*.entity.{ts,js}')],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false, // <-- Necesario para conectar con Supabase desde fuera
  },
});

// ... el resto del código (la función seed) se queda igual

async function seed() {
  try {
    console.log('🚀 Iniciando seed limpio...');
    await AppDataSource.initialize();
    
    const userRepo = AppDataSource.getRepository("User");
    const moduleRepo = AppDataSource.getRepository("StudyModule");
    const pdfRepo = AppDataSource.getRepository("PDFDocument");
    const flashcardRepo = AppDataSource.getRepository("Flashcard");

    // 1. Usuario
    let user = await userRepo.findOne({ where: { email: 'admin@physiokaki.com' } } as any);
    if (!user) {
      user = await userRepo.save(userRepo.create({
        email: 'admin@physiokaki.com',
        password: 'password123',
        fullName: 'Admin User'
      } as any));
      console.log('✅ Usuario creado');
    }

    // 2. Módulo - SIN TRUCO, SIN BYPASS
    const sm = await moduleRepo.save(moduleRepo.create({ 
      name: 'Anatomia: Membros Superiores',
      title: 'Anatomia: Membros Superiores',  // ← AÑADE ESTA LÍNEA
      description: 'Estudo detalhado',
      content: 'Conteúdo'
    }));
    console.log('✅ Módulo creado con name:', sm.name);

    // 3. PDF
    const pdf = await pdfRepo.save(pdfRepo.create({
      title: 'Manual de Anatomia',
      fileUrl: 'http://localhost:3001/uploads/manual.pdf',
      user: user
    } as any));
    console.log('✅ PDF creado');

    // 4. Flashcards
    const cards = [
      { question: 'Ponto de união óssea?', answer: 'Articulação Esternoclavicular.' },
      { question: 'Manguito Rotador?', answer: 'Supra, Infra, Redondo Menor e Subescapular.' }
    ];

    for (const data of cards) {
      await flashcardRepo.save(flashcardRepo.create({
        ...data,
        module: sm,
        sourcePdf: pdf
      } as any));
    }
    console.log('✅ Flashcards creadas');

    console.log('🎉 ¡Seed completado exitosamente!');

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error('Stack:', err.stack);
  } finally {
    if (AppDataSource.isInitialized) await AppDataSource.destroy();
  }
}

seed();