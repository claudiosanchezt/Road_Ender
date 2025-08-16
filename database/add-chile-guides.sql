-- =============================================================================
-- MIGRACIÓN: Agregar TODAS las Zonas Turísticas de Chile con Guías Especializados
-- Fecha: 25 de Julio 2025
-- Descripción: 3 guías especializados por cada zona turística principal de Chile
-- Precios expresados en dólares estadounidenses (USD)
-- =============================================================================

-- Insertar TODAS las zonas turísticas de Chile
INSERT INTO destinations (name, country, difficulty, rating, description, tours_count, guides_count, features, image_url) 
VALUES 
  -- NORTE DE CHILE
  (
    'Desierto de Atacama', 
    'Chile', 
    'Principiante', 
    4.9, 
    'Contempla paisajes marcianos y cielos estrellados en el desierto más árido del mundo',
    20, 
    6, 
    '{"Astronomía", "Geysers", "Lagunas", "Flamencos"}',
    'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=400&h=300&fit=crop'
  ),
  (
    'Altiplano y Putre', 
    'Chile', 
    'Avanzado', 
    4.7, 
    'Explora volcanes activos y lagunas de altura en el techo andino de Chile',
    8, 
    3, 
    '{"Volcanes", "Altitud", "Vicuñas", "Termas"}',
    'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=400&h=300&fit=crop'
  ),
  (
    'Iquique y Playa Brava', 
    'Chile', 
    'Principiante', 
    4.6, 
    'Disfruta playas del Pacífico, deportes acuáticos y la histórica oficina salitrera',
    12, 
    3, 
    '{"Surf", "Historia Salitrera", "Parapente", "Playas"}',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop'
  ),
  
  -- NORTE CHICO
  (
    'Valle del Elqui', 
    'Chile', 
    'Principiante', 
    4.8, 
    'Explora viñedos, observatorios astronómicos y la magia del valle de los poetas',
    12, 
    3, 
    '{"Vinos", "Astronomía", "Poesía", "Paisajes"}',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
  ),
  (
    'La Serena y Coquimbo', 
    'Chile', 
    'Principiante', 
    4.5, 
    'Descubre playas, faros históricos y la arquitectura colonial del norte chico',
    10, 
    3, 
    '{"Playas", "Faros", "Arquitectura", "Historia"}',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
  ),
  
  -- ZONA CENTRAL
  (
    'Valparaíso y Viña del Mar', 
    'Chile', 
    'Principiante', 
    4.7, 
    'Descubre el arte urbano y la cultura bohemia en los cerros coloridos del puerto principal',
    15, 
    3, 
    '{"Arte Urbano", "Historia", "Gastronomía", "Cultura"}',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop'
  ),
  (
    'Santiago y Cordillera', 
    'Chile', 
    'Intermedio', 
    4.4, 
    'Explora la capital cosmopolita y los centros de esquí de clase mundial',
    25, 
    3, 
    '{"Ciudad", "Esquí", "Gastronomía", "Vida Nocturna"}',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
  ),
  (
    'Rancagua y Sewell', 
    'Chile', 
    'Intermedio', 
    4.3, 
    'Conoce la historia minera y los paisajes andinos de la región del libertador',
    6, 
    3, 
    '{"Minería", "Historia", "Termas", "Montaña"}',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'
  ),
  
  -- VALLE CENTRAL
  (
    'Valle de Colchagua', 
    'Chile', 
    'Principiante', 
    4.6, 
    'Recorre viñedos premium y haciendas coloniales en el corazón vitivinícola',
    14, 
    3, 
    '{"Vinos", "Haciendas", "Gastronomía", "Tradición"}',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop'
  ),
  (
    'Curicó y Molina', 
    'Chile', 
    'Principiante', 
    4.4, 
    'Explora viñedos familiares y tradiciones rurales del valle central',
    8, 
    3, 
    '{"Vinos Familiares", "Tradición", "Campo", "Artesanías"}',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
  ),
  
  -- SUR DE CHILE
  (
    'Pucón y Villarrica', 
    'Chile', 
    'Intermedio', 
    4.8, 
    'Vive aventuras extremas entre volcanes activos, lagos cristalinos y termas naturales',
    18, 
    3, 
    '{"Volcanes", "Lagos", "Termas", "Aventura"}',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
  ),
  (
    'Valdivia y Selva Valdiviana', 
    'Chile', 
    'Intermedio', 
    4.7, 
    'Navega ríos históricos y explora bosques templados únicos en el mundo',
    12, 
    3, 
    '{"Ríos", "Bosque Templado", "Historia", "Cervecerías"}',
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop'
  ),
  (
    'Isla de Chiloé', 
    'Chile', 
    'Intermedio', 
    4.6, 
    'Conoce las tradiciones ancestrales, iglesias de madera y la mitología chilota única',
    10, 
    3, 
    '{"Cultura", "Mitología", "Palafitos", "Mariscos"}',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
  ),
  
  -- PATAGONIA CHILENA
  (
    'Patagonia - Torres del Paine', 
    'Chile', 
    'Avanzado', 
    4.9, 
    'Explora las majestuosas torres de granito y glaciares milenarios en paisajes épicos',
    18, 
    3, 
    '{"Glaciares", "Trekking", "Fotografía", "Vida Silvestre"}',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop'
  ),
  (
    'Carretera Austral', 
    'Chile', 
    'Avanzado', 
    4.8, 
    'Recorre una de las rutas más espectaculares del mundo entre fiordos y glaciares',
    15, 
    3, 
    '{"Road Trip", "Fiordos", "Glaciares", "Naturaleza Prístina"}',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
  ),
  (
    'Punta Arenas y Estrecho de Magallanes', 
    'Chile', 
    'Intermedio', 
    4.5, 
    'Descubre el fin del mundo, pingüinos y la historia de la colonización austral',
    10, 
    3, 
    '{"Pingüinos", "Historia Austral", "Estrecho", "Estancias"}',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop'
  )
ON CONFLICT (name) DO NOTHING;

-- =============================================================================
-- GUÍAS ESPECIALIZADOS CON PRECIOS EN DÓLARES (USD)
-- 3 guías por cada zona turística de Chile
-- =============================================================================

-- Primero, agregar columna de precio si no existe
ALTER TABLE guides ADD COLUMN IF NOT EXISTS price_per_day DECIMAL(8,2) DEFAULT 0.00;
ALTER TABLE guides ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'USD';

INSERT INTO guides (name, location, rating, review_count, specialties, image_url, description, badge, zone, price_per_day, currency) 
VALUES 
-- =============================================================================
-- DESIERTO DE ATACAMA - Norte Grande
-- =============================================================================
  (
    'Alejandra Vargas',
    'San Pedro de Atacama, Chile',
    4.9,
    189,
    '{"Astronomía", "Geysers", "Altiplano"}',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'Astrónoma profesional que revela los secretos del cielo más limpio del mundo',
    '🌟 Star Master',
    'Desierto de Atacama',
    120.00,
    'USD'
  ),
  (
    'José Atacameño',
    'San Pedro de Atacama, Chile',
    4.8,
    156,
    '{"Cultura Atacameña", "Lagunas", "Flamencos"}',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'Descendiente atacameño que comparte la sabiduría ancestral del desierto',
    '🏜️ Desert Soul',
    'Desierto de Atacama',
    95.00,
    'USD'
  ),
  (
    'Isabella Salinas',
    'Calama - Atacama, Chile',
    4.7,
    134,
    '{"Geología", "Volcanes", "Minerales"}',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=150&fit=crop&crop=face',
    'Geóloga especializada en formaciones volcánicas y minerales del Atacama',
    '🌋 Geo Expert',
    'Desierto de Atacama',
    110.00,
    'USD'
  ),

-- =============================================================================
-- ALTIPLANO Y PUTRE - Norte Grande
-- =============================================================================
  (
    'Mamani Condori',
    'Putre, Chile',
    4.8,
    145,
    '{"Altitud", "Volcanes", "Cultura Aymara"}',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'Guía aymara especializado en aclimatación y volcanes de más de 6000m',
    '🏔️ High Altitude',
    'Altiplano y Putre',
    140.00,
    'USD'
  ),
  (
    'Carolina Vicuña',
    'Putre - Parque Lauca, Chile',
    4.9,
    167,
    '{"Fauna Andina", "Vicuñas", "Termas"}',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'Bióloga experta en fauna de altura y conservación de vicuñas',
    '🦙 Wildlife Expert',
    'Altiplano y Putre',
    125.00,
    'USD'
  ),
  (
    'Esteban Volcán',
    'Putre, Chile',
    4.7,
    123,
    '{"Montañismo", "Volcanes", "Supervivencia"}',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'Montañista certificado para ascensos a volcanes de más de 6000 metros',
    '⛰️ Volcano Climber',
    'Altiplano y Putre',
    160.00,
    'USD'
  ),

-- =============================================================================
-- IQUIQUE Y PLAYA BRAVA - Norte Grande
-- =============================================================================
  (
    'Roberto Salitrero',
    'Iquique, Chile',
    4.6,
    134,
    '{"Historia Salitrera", "Desierto", "Oficinas"}',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    'Historiador especializado en la época dorada del salitre y la pampa',
    '⚱️ Nitrate History',
    'Iquique y Playa Brava',
    75.00,
    'USD'
  ),
  (
    'Paloma Surfista',
    'Iquique, Chile',
    4.7,
    156,
    '{"Surf", "Deportes Acuáticos", "Playas"}',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    'Instructora de surf profesional en las mejores olas del norte de Chile',
    '🏄‍♀️ Wave Rider',
    'Iquique y Playa Brava',
    85.00,
    'USD'
  ),
  (
    'Diego Parapente',
    'Alto Hospicio - Iquique, Chile',
    4.8,
    189,
    '{"Parapente", "Vuelo", "Adrenalina"}',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    'Piloto certificado de parapente con vistas espectaculares del Pacífico',
    '🪂 Sky Master',
    'Iquique y Playa Brava',
    90.00,
    'USD'
  ),

-- =============================================================================
-- VALLE DEL ELQUI - Norte Chico
-- =============================================================================
  (
    'Soledad Cósmica',
    'Vicuña, Valle del Elqui, Chile',
    4.9,
    178,
    '{"Astronomía", "Observatorios", "Cielos"}',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'Astrónoma que combina ciencia con la magia espiritual del valle de Elqui',
    '🔭 Cosmic Guide',
    'Valle del Elqui',
    100.00,
    'USD'
  ),
  (
    'Vicente Pisquero',
    'Pisco Elqui, Chile',
    4.8,
    156,
    '{"Pisco", "Viñedos", "Destilación"}',
    'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
    'Maestro destilador que enseña los secretos del pisco y las tradiciones vitivinícolas',
    '🥃 Pisco Master',
    'Valle del Elqui',
    80.00,
    'USD'
  ),
  (
    'Gabriela Mistral Jr.',
    'Montegrande, Valle del Elqui, Chile',
    4.7,
    134,
    '{"Literatura", "Poesía", "Cultura"}',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    'Guía cultural que sigue los pasos de Gabriela Mistral por su valle natal',
    '📖 Poetry Soul',
    'Valle del Elqui',
    70.00,
    'USD'
  ),

-- =============================================================================
-- LA SERENA Y COQUIMBO - Norte Chico
-- =============================================================================
  (
    'Francisco Faro',
    'La Serena, Chile',
    4.5,
    123,
    '{"Faros", "Historia Colonial", "Arquitectura"}',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'Historiador arquitectónico especializado en faros y patrimonio colonial',
    '🏛️ Heritage Guide',
    'La Serena y Coquimbo',
    65.00,
    'USD'
  ),
  (
    'Marina Playa',
    'Coquimbo, Chile',
    4.6,
    145,
    '{"Playas", "Deportes Náuticos", "Gastronomía"}',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'Guía costera experta en playas del norte chico y mariscos locales',
    '🏖️ Beach Expert',
    'La Serena y Coquimbo',
    60.00,
    'USD'
  ),
  (
    'Cristóbal Observador',
    'Vicuña - La Serena, Chile',
    4.7,
    167,
    '{"Observatorios", "Turismo Científico", "Astronomía"}',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'Físico que conecta observatorios profesionales con turismo astronómico',
    '🌌 Science Guide',
    'La Serena y Coquimbo',
    95.00,
    'USD'
  ),

-- =============================================================================
-- VALPARAÍSO Y VIÑA DEL MAR - Zona Central
-- =============================================================================
  (
    'Arturo Bohemio',
    'Valparaíso, Chile',
    4.8,
    198,
    '{"Arte Urbano", "Historia", "Cultura Porteña"}',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    'Artista local que conoce cada mural y leyenda de los cerros de Valparaíso',
    '🎨 Street Art',
    'Valparaíso y Viña del Mar',
    70.00,
    'USD'
  ),
  (
    'Carmen Oceana',
    'Viña del Mar, Chile',
    4.7,
    167,
    '{"Gastronomía", "Vinos", "Costa"}',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    'Chef especializada en mariscos y vinos de la región de Valparaíso',
    '🍷 Ocean Chef',
    'Valparaíso y Viña del Mar',
    85.00,
    'USD'
  ),
  (
    'Pablo Marinero',
    'Valparaíso - Viña, Chile',
    4.6,
    145,
    '{"Historia Naval", "Patrimonio", "Arquitectura"}',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'Historiador naval que narra las aventuras marítimas del puerto principal',
    '⚓ Sea Heritage',
    'Valparaíso y Viña del Mar',
    75.00,
    'USD'
  ),

-- =============================================================================
-- SANTIAGO Y CORDILLERA - Región Metropolitana
-- =============================================================================
  (
    'Sofía Urbana',
    'Santiago, Chile',
    4.4,
    234,
    '{"Ciudad", "Gastronomía", "Vida Nocturna"}',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'Guía urbana que conoce los secretos gastronómicos y culturales de Santiago',
    '🏙️ City Expert',
    'Santiago y Cordillera',
    60.00,
    'USD'
  ),
  (
    'Andrés Esquiador',
    'Valle Nevado - Santiago, Chile',
    4.6,
    178,
    '{"Esquí", "Snowboard", "Montaña"}',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop&crop=face',
    'Instructor de esquí certificado en los mejores centros de la cordillera',
    '⛷️ Snow Master',
    'Santiago y Cordillera',
    110.00,
    'USD'
  ),
  (
    'Teresa Cordillera',
    'Cajón del Maipo - Santiago, Chile',
    4.5,
    156,
    '{"Trekking", "Termas", "Montañismo"}',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    'Montañista que guía por los senderos y termas del Cajón del Maipo',
    '🥾 Mountain Guide',
    'Santiago y Cordillera',
    80.00,
    'USD'
  ),

-- =============================================================================
-- RANCAGUA Y SEWELL - Región de O'Higgins
-- =============================================================================
  (
    'Patricio Minero',
    'Sewell - Rancagua, Chile',
    4.3,
    123,
    '{"Historia Minera", "Patrimonio", "Cobre"}',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    'Ex-minero que narra la historia épica de la ciudad del cobre',
    '⛏️ Copper Heritage',
    'Rancagua y Sewell',
    55.00,
    'USD'
  ),
  (
    'Esperanza Termal',
    'Termas del Flaco - Rancagua, Chile',
    4.4,
    145,
    '{"Termas", "Relax", "Montaña"}',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'Especialista en terapias termales y bienestar en la precordillera',
    '♨️ Thermal Expert',
    'Rancagua y Sewell',
    65.00,
    'USD'
  ),
  (
    'Ricardo Huaso',
    'Rancagua, Chile',
    4.2,
    98,
    '{"Tradición Huasa", "Rodeo", "Campo"}',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'Huaso tradicional que enseña el rodeo y las tradiciones campesinas',
    '🐎 Huaso Guide',
    'Rancagua y Sewell',
    70.00,
    'USD'
  ),

-- =============================================================================
-- VALLE DE COLCHAGUA - Región de O'Higgins
-- =============================================================================
  (
    'Enrique Viñatero',
    'Santa Cruz - Colchagua, Chile',
    4.6,
    189,
    '{"Vinos Premium", "Cata", "Viñedos"}',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'Sommelier especializado en vinos ultra premium del valle de Colchagua',
    '🍾 Wine Master',
    'Valle de Colchagua',
    90.00,
    'USD'
  ),
  (
    'Francisca Hacienda',
    'San Fernando - Colchagua, Chile',
    4.5,
    156,
    '{"Haciendas", "Historia", "Tradición"}',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    'Historiadora que cuenta la vida en las haciendas coloniales del valle',
    '🏛️ Estate Guide',
    'Valle de Colchagua',
    75.00,
    'USD'
  ),
  (
    'Gonzalo Gastronómico',
    'Santa Cruz, Chile',
    4.7,
    167,
    '{"Gastronomía", "Maridaje", "Cocina Chilena"}',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    'Chef que combina cocina tradicional chilena con vinos de clase mundial',
    '👨‍🍳 Culinary Expert',
    'Valle de Colchagua',
    85.00,
    'USD'
  ),

-- =============================================================================
-- CURICÓ Y MOLINA - Región del Maule
-- =============================================================================
  (
    'Miguel Familiar',
    'Curicó, Chile',
    4.4,
    134,
    '{"Vinos Familiares", "Tradición", "Pequeños Productores"}',
    'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
    'Viñatero de tercera generación que muestra la tradición vitivinícola familiar',
    '🍇 Family Tradition',
    'Curicó y Molina',
    65.00,
    'USD'
  ),
  (
    'Rosa Artesana',
    'Molina, Chile',
    4.3,
    123,
    '{"Artesanías", "Tradición", "Cerámica"}',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'Artesana que enseña técnicas ancestrales de cerámica y tejidos tradicionales',
    '🏺 Craft Master',
    'Curicó y Molina',
    50.00,
    'USD'
  ),
  (
    'Carlos Campesino',
    'Curicó - Molina, Chile',
    4.2,
    109,
    '{"Vida Rural", "Agricultura", "Campo"}',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=150&fit=crop&crop=face',
    'Agricultor que comparte la auténtica vida rural del valle central',
    '🚜 Rural Life',
    'Curicó y Molina',
    55.00,
    'USD'
  ),

-- =============================================================================
-- PUCÓN Y VILLARRICA - Región de la Araucanía
-- =============================================================================
  (
    'Ignacio Volcánico',
    'Pucón, Chile',
    4.8,
    234,
    '{"Volcán Villarrica", "Trekking", "Aventura"}',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop&crop=face',
    'Guía de montaña certificado para ascensos al volcán Villarrica',
    '🌋 Volcano Expert',
    'Pucón y Villarrica',
    120.00,
    'USD'
  ),
  (
    'Carla Lagos',
    'Pucón - Villarrica, Chile',
    4.9,
    189,
    '{"Lagos", "Deportes Acuáticos", "Kayak"}',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    'Instructora de deportes acuáticos en los cristalinos lagos de la Araucanía',
    '🚣‍♀️ Lake Master',
    'Pucón y Villarrica',
    85.00,
    'USD'
  ),
  (
    'Raúl Termal',
    'Pucón - Termas Geométricas, Chile',
    4.7,
    156,
    '{"Termas", "Relax", "Bosque Nativo"}',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    'Especialista en turismo termal y conocedor de bosques nativos',
    '♨️ Thermal Guide',
    'Pucón y Villarrica',
    75.00,
    'USD'
  ),

-- =============================================================================
-- VALDIVIA Y SELVA VALDIVIANA - Región de Los Ríos
-- =============================================================================
  (
    'Roberto Fluvial',
    'Valdivia, Chile',
    4.7,
    178,
    '{"Ríos", "Historia", "Navegación"}',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'Capitán que navega los históricos ríos de Valdivia contando su rica historia',
    '🚤 River Captain',
    'Valdivia y Selva Valdiviana',
    70.00,
    'USD'
  ),
  (
    'Elena Selvática',
    'Valdivia - Bosque Templado, Chile',
    4.8,
    167,
    '{"Bosque Templado", "Ecología", "Flora Nativa"}',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'Bióloga especializada en el único bosque templado lluvioso de Sudamérica',
    '🌲 Forest Expert',
    'Valdivia y Selva Valdiviana',
    80.00,
    'USD'
  ),
  (
    'Tomás Cervecero',
    'Valdivia, Chile',
    4.6,
    145,
    '{"Cervecerías", "Gastronomía", "Cultura Alemana"}',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'Maestro cervecero que muestra la herencia alemana y cervezas artesanales',
    '🍺 Brew Master',
    'Valdivia y Selva Valdiviana',
    65.00,
    'USD'
  ),

-- =============================================================================
-- ISLA DE CHILOÉ - Región de Los Lagos
-- =============================================================================
  (
    'Domingo Chilote',
    'Castro, Chiloé, Chile',
    4.8,
    189,
    '{"Mitología", "Palafitos", "Tradiciones"}',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    'Narrador de leyendas chilotas que mantiene viva la tradición oral de la isla',
    '🏘️ Mythic Teller',
    'Isla de Chiloé',
    75.00,
    'USD'
  ),
  (
    'Rosario Marisquera',
    'Ancud, Chiloé, Chile',
    4.7,
    167,
    '{"Mariscos", "Gastronomía", "Pesca"}',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'Experta en mariscos y técnicas ancestrales de pesca de los chilotes',
    '🦐 Sea Harvest',
    'Isla de Chiloé',
    70.00,
    'USD'
  ),
  (
    'Mateo Carpintero',
    'Dalcahue, Chiloé, Chile',
    4.6,
    145,
    '{"Iglesias", "Arquitectura", "Madera"}',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    'Maestro carpintero especializado en la arquitectura única de las iglesias chilotas',
    '⛪ Wood Master',
    'Isla de Chiloé',
    65.00,
    'USD'
  ),

-- =============================================================================
-- PATAGONIA - TORRES DEL PAINE - Región de Magallanes
-- =============================================================================
  (
    'Carlos Mendoza',
    'Torres del Paine, Chile',
    4.9,
    167,
    '{"Trekking", "Glaciares", "Fauna Patagónica"}',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'Guía de montaña certificado con 15 años explorando Torres del Paine y sus glaciares',
    '🏔️ Patagonia Expert',
    'Patagonia - Torres del Paine',
    150.00,
    'USD'
  ),
  (
    'María Elena Torres',
    'Puerto Natales, Chile',
    4.8,
    145,
    '{"Fotografía", "Condor", "Ice Trekking"}',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'Fotógrafa naturalista especializada en capturar la majestuosidad de la Patagonia',
    '📸 Wild Photo',
    'Patagonia - Torres del Paine',
    130.00,
    'USD'
  ),
  (
    'Rodrigo Bahamonde',
    'El Calafate - Torres del Paine, Chile',
    4.9,
    203,
    '{"Kayak", "Glaciares", "Navegación"}',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'Experto en navegación patagónica y kayak entre icebergs del Parque Nacional',
    '🚣 Ice Navigator',
    'Patagonia - Torres del Paine',
    140.00,
    'USD'
  ),

-- =============================================================================
-- CARRETERA AUSTRAL - Región de Aysén
-- =============================================================================
  (
    'Alejandro Austral',
    'Villa O\'Higgins - Carretera Austral, Chile',
    4.8,
    156,
    '{"Road Trip", "Fiordos", "Aventura"}',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop&crop=face',
    'Conductor experto de la Carretera Austral con conocimiento de cada fiordo',
    '🛣️ Road Master',
    'Carretera Austral',
    120.00,
    'USD'
  ),
  (
    'Francisca Glaciar',
    'El Chaltén - Carretera Austral, Chile',
    4.9,
    178,
    '{"Glaciares", "Hielo Azul", "Trekking Extremo"}',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'Glacióloga que guía por los campos de hielo más espectaculares del mundo',
    '🧊 Ice Expert',
    'Carretera Austral',
    160.00,
    'USD'
  ),
  (
    'Martín Prístino',
    'Puerto Aysén - Carretera Austral, Chile',
    4.7,
    134,
    '{"Naturaleza Prístina", "Fauna", "Conservación"}',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    'Conservacionista que protege y muestra la naturaleza más pura de la Patagonia',
    '🦎 Wild Guardian',
    'Carretera Austral',
    110.00,
    'USD'
  ),

-- =============================================================================
-- PUNTA ARENAS Y ESTRECHO DE MAGALLANES
-- =============================================================================
  (
    'Capitán Estrecho',
    'Punta Arenas, Chile',
    4.5,
    145,
    '{"Estrecho Magallanes", "Historia Austral", "Navegación"}',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    'Capitán de la Armada retirado que conoce cada secreto del estrecho de Magallanes',
    '⚓ Strait Captain',
    'Punta Arenas y Estrecho de Magallanes',
    90.00,
    'USD'
  ),
  (
    'Pingüina Paula',
    'Punta Arenas - Isla Magdalena, Chile',
    4.6,
    167,
    '{"Pingüinos", "Fauna Marina", "Conservación"}',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'Bióloga marina especializada en pingüinos de Magallanes y fauna austral',
    '🐧 Penguin Expert',
    'Punta Arenas y Estrecho de Magallanes',
    85.00,
    'USD'
  ),
  (
    'Esteban Estanciero',
    'Punta Arenas - Estancias, Chile',
    4.4,
    123,
    '{"Estancias", "Ganadería", "Tradición Patagónica"}',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'Estanciero de quinta generación que muestra la vida ganadera en el fin del mundo',
    '🐑 Ranch Master',
    'Punta Arenas y Estrecho de Magallanes',
    95.00,
    'USD'
  );

-- =============================================================================
-- ACTUALIZAR CONTADORES DE GUÍAS POR DESTINO
-- =============================================================================

UPDATE destinations 
SET guides_count = (
  SELECT COUNT(*) 
  FROM guides 
  WHERE guides.zone = destinations.name
) 
WHERE country = 'Chile';

-- =============================================================================
-- VERIFICACIÓN DE DATOS INSERTADOS CON PRECIOS
-- =============================================================================

-- Mostrar resumen de guías por zona chilena con precios
SELECT 
  zone as "Zona Chilena",
  COUNT(*) as "Cantidad de Guías",
  ROUND(AVG(rating), 2) as "Rating Promedio",
  CONCAT('$', ROUND(MIN(price_per_day), 0), ' - $', ROUND(MAX(price_per_day), 0), ' USD') as "Rango de Precios",
  ROUND(AVG(price_per_day), 2) as "Precio Promedio USD",
  STRING_AGG(DISTINCT UNNEST(specialties), ', ') as "Especialidades"
FROM guides 
WHERE location LIKE '%Chile%' 
GROUP BY zone
ORDER BY AVG(price_per_day) DESC;

-- Mostrar destinos chilenos con sus contadores actualizados
SELECT 
  name as "Destino",
  difficulty as "Dificultad",
  rating as "Rating",
  tours_count as "Tours",
  guides_count as "Guías Disponibles"
FROM destinations 
WHERE country = 'Chile'
ORDER BY rating DESC;

-- Top 10 guías más caros de Chile
SELECT 
  name as "Guía",
  zone as "Zona",
  CONCAT('$', price_per_day, ' ', currency) as "Precio por Día",
  rating as "Rating",
  STRING_AGG(DISTINCT UNNEST(specialties), ', ') as "Especialidades"
FROM guides 
WHERE location LIKE '%Chile%'
ORDER BY price_per_day DESC
LIMIT 10;

-- Estadísticas generales de precios por dificultad de zona
SELECT 
  d.difficulty as "Dificultad",
  COUNT(g.id) as "Total Guías",
  CONCAT('$', ROUND(MIN(g.price_per_day), 0), ' - $', ROUND(MAX(g.price_per_day), 0)) as "Rango Precios",
  CONCAT('$', ROUND(AVG(g.price_per_day), 2)) as "Precio Promedio",
  ROUND(AVG(d.rating), 2) as "Rating Promedio Zona"
FROM destinations d
JOIN guides g ON g.zone = d.name
WHERE d.country = 'Chile'
GROUP BY d.difficulty
ORDER BY AVG(g.price_per_day) DESC;

COMMIT;
