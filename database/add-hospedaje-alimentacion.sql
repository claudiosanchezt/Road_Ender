-- Tabla para hospedajes
CREATE TABLE IF NOT EXISTS hospedajes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  zone_id INTEGER NULL,
  guide_id INTEGER NULL,
  price NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabla para opciones de alimentacion asociadas a hospedajes
CREATE TABLE IF NOT EXISTS alimentacion_options (
  id SERIAL PRIMARY KEY,
  hospedaje_id INTEGER NOT NULL REFERENCES hospedajes(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- breakfast, half-board, full-board, etc.
  price NUMERIC(10,2) DEFAULT 0,
  notes TEXT
);
