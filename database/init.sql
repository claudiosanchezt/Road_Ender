-- Inicialización básica de esquema para Road_Ender
-- Crear tablas principales y tablas puente según el diagrama

CREATE TABLE IF NOT EXISTS guides (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS zones (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tourist_places (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  zone_id INTEGER REFERENCES zones(id) ON DELETE SET NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS specialty_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS specialties (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category_id INTEGER REFERENCES specialty_categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS languages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  client_id TEXT NOT NULL,
  guide_id INTEGER REFERENCES guides(id) ON DELETE CASCADE,
  zone_id INTEGER REFERENCES zones(id) ON DELETE SET NULL,
  tourist_place_id INTEGER REFERENCES tourist_places(id) ON DELETE SET NULL,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(8) DEFAULT 'CLP',
  status VARCHAR(32) DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS favorite_zones (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  zone_id INTEGER REFERENCES zones(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorite_tourist_places (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  tourist_place_id INTEGER REFERENCES tourist_places(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT,
  body TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS weather_alerts (
  id SERIAL PRIMARY KEY,
  zone_id INTEGER REFERENCES zones(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  severity VARCHAR(16) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS continents (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  continent_id INTEGER REFERENCES continents(id) ON DELETE SET NULL
);

-- Tablas puente para relaciones many-to-many
CREATE TABLE IF NOT EXISTS guide_zones (
  guide_id INTEGER REFERENCES guides(id) ON DELETE CASCADE,
  zone_id INTEGER REFERENCES zones(id) ON DELETE CASCADE,
  PRIMARY KEY (guide_id, zone_id)
);

CREATE TABLE IF NOT EXISTS guide_tourist_places (
  guide_id INTEGER REFERENCES guides(id) ON DELETE CASCADE,
  tourist_place_id INTEGER REFERENCES tourist_places(id) ON DELETE CASCADE,
  PRIMARY KEY (guide_id, tourist_place_id)
);

CREATE TABLE IF NOT EXISTS guide_specialties (
  guide_id INTEGER REFERENCES guides(id) ON DELETE CASCADE,
  specialty_id INTEGER REFERENCES specialties(id) ON DELETE CASCADE,
  PRIMARY KEY (guide_id, specialty_id)
);

CREATE TABLE IF NOT EXISTS guide_languages (
  guide_id INTEGER REFERENCES guides(id) ON DELETE CASCADE,
  language_id INTEGER REFERENCES languages(id) ON DELETE CASCADE,
  PRIMARY KEY (guide_id, language_id)
);

-- Seed básico
INSERT INTO specialty_categories (name) VALUES ('Aventura') ON CONFLICT DO NOTHING;
INSERT INTO specialties (name, category_id) VALUES ('Montañismo', 1) ON CONFLICT DO NOTHING;
INSERT INTO languages (name) VALUES ('Español') ON CONFLICT DO NOTHING;
INSERT INTO languages (name) VALUES ('Inglés') ON CONFLICT DO NOTHING;

INSERT INTO continents (name) VALUES ('América') ON CONFLICT DO NOTHING;
INSERT INTO countries (name, continent_id) VALUES ('Chile', 1) ON CONFLICT DO NOTHING;

-- Crear ejemplo de zona, lugar, guía y asociación
INSERT INTO zones (name, region) VALUES ('Zona Norte', 'Atacama') ON CONFLICT DO NOTHING;
INSERT INTO tourist_places (name, zone_id, description) VALUES ('Valle de la Luna', 1, 'Paisaje lunar en Atacama') ON CONFLICT DO NOTHING;
INSERT INTO guides (user_id, name, bio) VALUES (1, 'Guía Demo', 'Guía de prueba') ON CONFLICT DO NOTHING;

-- Asociaciones puente (requieren que los ids existan)
INSERT INTO guide_zones (guide_id, zone_id) SELECT g.id, z.id FROM guides g, zones z WHERE g.name = 'Guía Demo' AND z.name = 'Zona Norte' ON CONFLICT DO NOTHING;
INSERT INTO guide_tourist_places (guide_id, tourist_place_id) SELECT g.id, t.id FROM guides g, tourist_places t WHERE g.name = 'Guía Demo' AND t.name = 'Valle de la Luna' ON CONFLICT DO NOTHING;

-- Asociar specialty al guía demo
INSERT INTO guide_specialties (guide_id, specialty_id)
SELECT g.id, s.id FROM guides g, specialties s WHERE g.name = 'Guía Demo' AND s.name = 'Montañismo' ON CONFLICT DO NOTHING;

COMMIT;
