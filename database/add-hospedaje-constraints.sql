-- Agregar FK e índices de manera condicional para hospedajes/alimentacion
DO $$
BEGIN
  -- FK hospedajes.zone_id -> zones(id)
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'zones') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
      WHERE tc.table_name = 'hospedajes' AND tc.constraint_type = 'FOREIGN KEY' AND kcu.column_name = 'zone_id'
    ) THEN
      EXECUTE 'ALTER TABLE hospedajes ADD CONSTRAINT fk_hospedajes_zone FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE SET NULL';
    END IF;
  END IF;

  -- FK hospedajes.guide_id -> guides(id)
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'guides') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
      WHERE tc.table_name = 'hospedajes' AND tc.constraint_type = 'FOREIGN KEY' AND kcu.column_name = 'guide_id'
    ) THEN
      EXECUTE 'ALTER TABLE hospedajes ADD CONSTRAINT fk_hospedajes_guide FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE SET NULL';
    END IF;
  END IF;

  -- Índice en hospedajes.zone_id
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='hospedajes' AND indexname='idx_hospedajes_zone_id') THEN
    EXECUTE 'CREATE INDEX idx_hospedajes_zone_id ON hospedajes(zone_id)';
  END IF;

  -- Índice en hospedajes.guide_id
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='hospedajes' AND indexname='idx_hospedajes_guide_id') THEN
    EXECUTE 'CREATE INDEX idx_hospedajes_guide_id ON hospedajes(guide_id)';
  END IF;

  -- Índice en alimentacion_options.hospedaje_id
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='alimentacion_options' AND indexname='idx_alimentacion_hospedaje_id') THEN
    EXECUTE 'CREATE INDEX idx_alimentacion_hospedaje_id ON alimentacion_options(hospedaje_id)';
  END IF;

END$$;
