// Script para poblar la colección heroimages con 10 imágenes de zonas de Chile
// Ejecutar en el backend para inicializar datos

const mongoose = require('mongoose');
const HeroImage = require('./src/api/models/heroImage.model.js');

const images = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop&crop=center",
    title: "Torres del Paine",
    subtitle: "Patagonia Mágica",
    description: "Explora los glaciares y montañas más icónicos de Chile.",
    location: "Magallanes, Chile",
    fallback: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect width='1200' height='600' fill='%230ea5e9'/><text x='600' y='300' text-anchor='middle' fill='white' font-size='48'>Torres del Paine</text></svg>",
    country: "Chile"
  },
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=1200&h=600&fit=crop&crop=center",
    title: "Desierto de Atacama",
    subtitle: "Cielos Estrellados",
    description: "Vive la astronomía en el desierto más árido del mundo.",
    location: "Antofagasta, Chile",
    fallback: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect width='1200' height='600' fill='%23f59e0b'/><text x='600' y='300' text-anchor='middle' fill='white' font-size='48'>Atacama</text></svg>",
    country: "Chile"
  },
  {
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=1200&h=600&fit=crop&crop=center",
    title: "Lago Llanquihue",
    subtitle: "Aventura y Relajo",
    description: "Paisajes de lagos y volcanes en el sur de Chile.",
    location: "Los Lagos, Chile",
    fallback: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect width='1200' height='600' fill='%2316a34a'/><text x='600' y='300' text-anchor='middle' fill='white' font-size='48'>Llanquihue</text></svg>",
    country: "Chile"
  },
  {
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1200&h=600&fit=crop&crop=center",
    title: "Valle del Elqui",
    subtitle: "Misticismo y Pisco",
    description: "Disfruta de viñedos y cielos limpios en el norte.",
    location: "Coquimbo, Chile",
    fallback: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect width='1200' height='600' fill='%23d97706'/><text x='600' y='300' text-anchor='middle' fill='white' font-size='48'>Valle Elqui</text></svg>",
    country: "Chile"
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&h=600&fit=crop&crop=center",
    title: "Isla de Chiloé",
    subtitle: "Cultura y Naturaleza",
    description: "Descubre la magia de la isla y sus palafitos.",
    location: "Chiloé, Chile",
    fallback: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect width='1200' height='600' fill='%238b5cf6'/><text x='600' y='300' text-anchor='middle' fill='white' font-size='48'>Chiloé</text></svg>",
    country: "Chile"
  },
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=600&fit=crop&crop=center",
    title: "Rapa Nui",
    subtitle: "Misterio y Cultura",
    description: "Explora los moáis y playas de Isla de Pascua.",
    location: "Rapa Nui, Chile",
    fallback: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect width='1200' height='600' fill='%23047857'/><text x='600' y='300' text-anchor='middle' fill='white' font-size='48'>Rapa Nui</text></svg>",
    country: "Chile"
  },
  {
    image: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?w=1200&h=600&fit=crop&crop=center",
    title: "Pucón",
    subtitle: "Aventura y Termas",
    description: "Vive el turismo activo en la zona lacustre.",
    location: "Araucanía, Chile",
    fallback: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect width='1200' height='600' fill='%23059669'/><text x='600' y='300' text-anchor='middle' fill='white' font-size='48'>Pucón</text></svg>",
    country: "Chile"
  },
  {
    image: "https://images.unsplash.com/photo-1465101178521-c1a0725bdb16?w=1200&h=600&fit=crop&crop=center",
    title: "Valparaíso",
    subtitle: "Arte y Colores",
    description: "Recorre los cerros y murales de la ciudad puerto.",
    location: "Valparaíso, Chile",
    fallback: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect width='1200' height='600' fill='%23f59e0b'/><text x='600' y='300' text-anchor='middle' fill='white' font-size='48'>Valparaíso</text></svg>",
    country: "Chile"
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&h=600&fit=crop&crop=center",
    title: "Parque Conguillío",
    subtitle: "Bosques Milenarios",
    description: "Descubre araucarias y volcanes en la Araucanía.",
    location: "Araucanía, Chile",
    fallback: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect width='1200' height='600' fill='%2316a34a'/><text x='600' y='300' text-anchor='middle' fill='white' font-size='48'>Conguillío</text></svg>",
    country: "Chile"
  },
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=1200&h=600&fit=crop&crop=center",
    title: "Reserva Huilo Huilo",
    subtitle: "Magia Natural",
    description: "Bosques, ríos y cascadas en la selva valdiviana.",
    location: "Los Ríos, Chile",
    fallback: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><rect width='1200' height='600' fill='%230ea5e9'/><text x='600' y='300' text-anchor='middle' fill='white' font-size='48'>Huilo Huilo</text></svg>",
    country: "Chile"
  }
];

async function seed() {
  // Eliminar imágenes de la base incorrecta
  const connRoadender = await mongoose.createConnection('mongodb://admin:password@localhost:27017/roadender?authSource=admin');
  const HeroImageRoadender = connRoadender.model('HeroImage', HeroImage.schema);
  await HeroImageRoadender.deleteMany({ country: 'Chile' });
  await connRoadender.close();

  // Poblar la base correcta
  await mongoose.connect('mongodb://admin:password@localhost:27017/tourist_guides_datamart?authSource=admin');
  await HeroImage.deleteMany({ country: 'Chile' });
  await HeroImage.insertMany(images);
  console.log('Imágenes de Chile agregadas a tourist_guides_datamart');
  mongoose.disconnect();
}

seed();
