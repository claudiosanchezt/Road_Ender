-- Inicialización completa de la base de datos PostgreSQL
-- Tourist Guides App - Base Transaccional

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ====================================
-- TABLAS MAESTRAS
-- ====================================

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('client', 'guide', 'admin')),
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    profile_completed BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Tabla de zonas turísticas
CREATE TABLE IF NOT EXISTS zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    coordinates JSONB NOT NULL,
    complexity_level INTEGER CHECK (complexity_level BETWEEN 1 AND 10),
    max_altitude INTEGER,
    accessibility_rating INTEGER CHECK (accessibility_rating BETWEEN 1 AND 10),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de especialidades
CREATE TABLE IF NOT EXISTS specialties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('adventure', 'culture', 'gastronomy', 'nature', 'history', 'sports', 'wellness')),
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 10),
    required_certifications JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de idiomas
CREATE TABLE IF NOT EXISTS languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(5) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    native_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de métodos de pago
CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('credit_card', 'debit_card', 'digital_wallet', 'bank_transfer', 'cash')),
    provider VARCHAR(100) NOT NULL,
    fee_percentage DECIMAL(5,4) DEFAULT 0,
    processing_time INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- TABLAS DE GUÍAS
-- ====================================

-- Tabla principal de guías
CREATE TABLE IF NOT EXISTS guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(100) UNIQUE,
    experience_years INTEGER NOT NULL,
    hourly_rate DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'CLP',
    availability_status VARCHAR(20) DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'inactive')),
    max_group_size INTEGER DEFAULT 10,
    min_advance_booking INTEGER DEFAULT 24,
    cancellation_policy TEXT,
    emergency_contact VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de especialidades de guías
CREATE TABLE IF NOT EXISTS guide_specialties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    specialty_id UUID NOT NULL REFERENCES specialties(id) ON DELETE CASCADE,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 10),
    years_experience INTEGER DEFAULT 0,
    certifications JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(guide_id, specialty_id)
);

-- Tabla de zonas de trabajo de guías
CREATE TABLE IF NOT EXISTS guide_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    zone_id UUID NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
    knowledge_level INTEGER CHECK (knowledge_level BETWEEN 1 AND 10),
    last_tour_date TIMESTAMP WITH TIME ZONE,
    tour_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(guide_id, zone_id)
);

-- Tabla de idiomas de guías
CREATE TABLE IF NOT EXISTS guide_languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    language_id UUID NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(20) CHECK (proficiency_level IN ('basic', 'intermediate', 'advanced', 'native')),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(guide_id, language_id)
);

-- Tabla de contactos de emergencia
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    relationship VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de seguros
CREATE TABLE IF NOT EXISTS insurance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    provider VARCHAR(200) NOT NULL,
    policy_number VARCHAR(100) NOT NULL,
    coverage_amount DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'CLP',
    coverage_type VARCHAR(50) CHECK (coverage_type IN ('liability', 'accident', 'equipment', 'comprehensive')),
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- TABLAS DE FAVORITOS
-- ====================================

-- Tabla de guías favoritos
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, guide_id)
);

-- Tabla de zonas favoritas
CREATE TABLE IF NOT EXISTS favorite_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    zone_id UUID NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, zone_id)
);

-- ====================================
-- TABLAS DE RESERVAS Y PAGOS
-- ====================================

-- Tabla de reservas
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    zone_id UUID NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
    tour_date DATE NOT NULL,
    start_time TIME NOT NULL,
    estimated_duration INTEGER NOT NULL,
    group_size INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'CLP',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    special_requirements TEXT,
    meeting_point TEXT NOT NULL,
    pickup_required BOOLEAN DEFAULT FALSE,
    pickup_location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT
);

-- Tabla de pagos
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'CLP',
    payment_method_id UUID NOT NULL REFERENCES payment_methods(id),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    transaction_id VARCHAR(255),
    payment_gateway VARCHAR(100),
    flow_token VARCHAR(255),
    flow_url TEXT,
    gateway_response JSONB,
    fee_amount DECIMAL(10,2) DEFAULT 0,
    net_amount DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE,
    refunded_at TIMESTAMP WITH TIME ZONE,
    refund_reason TEXT
);

-- ====================================
-- TABLAS DE RESEÑAS Y NOTIFICACIONES
-- ====================================

-- Tabla de reseñas
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(200),
    comment TEXT,
    aspects JSONB DEFAULT '{}',
    photos JSONB DEFAULT '[]',
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    guide_response TEXT,
    guide_response_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de notificaciones
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('booking', 'payment', 'review', 'system', 'marketing', 'weather_alert')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    channel VARCHAR(20) DEFAULT 'app' CHECK (channel IN ('app', 'email', 'sms', 'push')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Tabla de alertas climáticas
CREATE TABLE IF NOT EXISTS weather_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    zone_id UUID NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('storm', 'high_wind', 'extreme_temperature', 'snow', 'rain', 'visibility')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'extreme')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
    affected_activities JSONB DEFAULT '[]',
    recommendations JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- TABLA DE LOGS DE ACTIVIDAD
-- ====================================

-- Tabla de logs de actividad
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- TRIGGERS PARA UPDATED_AT
-- ====================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_zones_updated_at BEFORE UPDATE ON zones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guides_updated_at BEFORE UPDATE ON guides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ====================================

-- Índices para usuarios
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);

-- Índices para guías
CREATE INDEX IF NOT EXISTS idx_guides_user_id ON guides(user_id);
CREATE INDEX IF NOT EXISTS idx_guides_status ON guides(availability_status);
CREATE INDEX IF NOT EXISTS idx_guides_hourly_rate ON guides(hourly_rate);

-- Índices para zonas
CREATE INDEX IF NOT EXISTS idx_zones_active ON zones(is_active);
CREATE INDEX IF NOT EXISTS idx_zones_complexity ON zones(complexity_level);

-- Índices para reservas
CREATE INDEX IF NOT EXISTS idx_bookings_client ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_guide ON bookings(guide_id);
CREATE INDEX IF NOT EXISTS idx_bookings_zone ON bookings(zone_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(tour_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Índices para pagos
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_gateway ON payments(payment_gateway);

-- Índices para reseñas
CREATE INDEX IF NOT EXISTS idx_reviews_guide ON reviews(guide_id);
CREATE INDEX IF NOT EXISTS idx_reviews_client ON reviews(client_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_verified ON reviews(is_verified);

-- Índices para favoritos
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_guide ON favorites(guide_id);
CREATE INDEX IF NOT EXISTS idx_favorite_zones_user ON favorite_zones(user_id);

-- Índices geoespaciales (requiere PostGIS)
-- CREATE INDEX IF NOT EXISTS idx_zones_coordinates ON zones USING GIST ((coordinates::geometry));

-- ====================================
-- DATOS INICIALES
-- ====================================

-- Insertar idiomas básicos
INSERT INTO languages (code, name, native_name) VALUES
('es', 'Español', 'Español'),
('en', 'English', 'English'),
('fr', 'Français', 'Français'),
('de', 'Deutsch', 'Deutsch'),
('pt', 'Português', 'Português'),
('it', 'Italiano', 'Italiano')
ON CONFLICT (code) DO NOTHING;

-- Insertar especialidades básicas
INSERT INTO specialties (name, description, category, difficulty_level) VALUES
('Trekking', 'Caminatas y senderismo en montaña', 'adventure', 6),
('Historia Local', 'Tours históricos y culturales', 'culture', 3),
('Gastronomía Regional', 'Experiencias culinarias locales', 'gastronomy', 4),
('Observación de Flora y Fauna', 'Tours de naturaleza y vida silvestre', 'nature', 5),
('Patrimonio Arquitectónico', 'Visitas a sitios históricos', 'history', 3),
('Deportes Extremos', 'Actividades de alto riesgo', 'sports', 9),
('Relajación y Bienestar', 'Experiencias de wellness', 'wellness', 2)
ON CONFLICT DO NOTHING;

-- Insertar métodos de pago básicos
INSERT INTO payment_methods (name, type, provider, fee_percentage, processing_time) VALUES
('Tarjeta de Crédito Visa', 'credit_card', 'Visa', 0.0299, 5),
('Tarjeta de Crédito MasterCard', 'credit_card', 'MasterCard', 0.0299, 5),
('Tarjeta de Débito', 'debit_card', 'Redbanc', 0.0199, 2),
('Flow', 'digital_wallet', 'Flow', 0.0399, 10),
('PayPal', 'digital_wallet', 'PayPal', 0.0349, 15),
('Transferencia Bancaria', 'bank_transfer', 'Banco Chile', 0.0099, 1440),
('Efectivo', 'cash', 'Efectivo', 0.0000, 0)
ON CONFLICT DO NOTHING;

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE '✅ Base de datos PostgreSQL inicializada correctamente';
    RAISE NOTICE '📊 Tablas creadas: %, %, %, %', 
        (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'),
        'usuarios, guías, reservas, pagos, reseñas, favoritos, etc.';
END $$;
