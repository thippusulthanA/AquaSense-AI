-- AquaSense-AI v2.0 - Relational Database Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role_enum AS ENUM ('admin', 'technician', 'user');
CREATE TYPE tank_status_enum AS ENUM ('optimal', 'good', 'warning', 'critical', 'offline');
CREATE TYPE sensor_type_enum AS ENUM ('ph', 'tds', 'turbidity', 'temperature', 'water_level', 'flow_rate');
CREATE TYPE fault_severity_enum AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE fault_status_enum AS ENUM ('detected', 'assigned', 'in_progress', 'resolved', 'closed');
CREATE TYPE inspection_status_enum AS ENUM ('pending', 'assigned', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE alert_type_enum AS ENUM ('water_quality', 'leakage', 'pump_failure', 'valve_failure', 'overflow', 'sensor_fault', 'sediment');

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    role user_role_enum NOT NULL DEFAULT 'user',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    campus_building VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Technicians Table
CREATE TABLE IF NOT EXISTS technicians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    specialization VARCHAR(100) NOT NULL,
    experience_years INT DEFAULT 1,
    is_available BOOLEAN DEFAULT TRUE,
    current_latitude DOUBLE PRECISION,
    current_longitude DOUBLE PRECISION,
    rating DOUBLE PRECISION DEFAULT 5.0,
    jobs_completed INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Storage Tanks Table
CREATE TABLE IF NOT EXISTS tanks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    location_building VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    capacity_liters DOUBLE PRECISION NOT NULL,
    current_volume_liters DOUBLE PRECISION DEFAULT 0.0,
    status tank_status_enum DEFAULT 'optimal',
    health_score INT DEFAULT 100,
    last_cleaned_at TIMESTAMP WITH TIME ZONE,
    next_recommended_cleaning TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Sensors Table
CREATE TABLE IF NOT EXISTS sensors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tank_id UUID REFERENCES tanks(id) ON DELETE CASCADE,
    sensor_code VARCHAR(50) UNIQUE NOT NULL,
    type sensor_type_enum NOT NULL,
    unit VARCHAR(20) NOT NULL,
    min_threshold DOUBLE PRECISION NOT NULL,
    max_threshold DOUBLE PRECISION NOT NULL,
    is_online BOOLEAN DEFAULT TRUE,
    last_calibrated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Sensor Readings Table
CREATE TABLE IF NOT EXISTS sensor_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sensor_id UUID REFERENCES sensors(id) ON DELETE CASCADE,
    tank_id UUID REFERENCES tanks(id) ON DELETE CASCADE,
    value DOUBLE PRECISION NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_anomaly BOOLEAN DEFAULT FALSE,
    raw_payload JSONB
);
CREATE INDEX idx_sensor_readings_tank_ts ON sensor_readings(tank_id, timestamp DESC);

-- 6. Faults Table
CREATE TABLE IF NOT EXISTS faults (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tank_id UUID REFERENCES tanks(id) ON DELETE CASCADE,
    fault_type alert_type_enum NOT NULL,
    severity fault_severity_enum NOT NULL,
    status fault_status_enum DEFAULT 'detected',
    title VARCHAR(200) NOT NULL,
    description TEXT,
    ai_diagnosis TEXT,
    recommended_action TEXT,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 7. Inspections Table
CREATE TABLE IF NOT EXISTS inspections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inspection_code VARCHAR(50) UNIQUE NOT NULL,
    tank_id UUID REFERENCES tanks(id) ON DELETE CASCADE,
    fault_id UUID REFERENCES faults(id) ON DELETE SET NULL,
    technician_id UUID REFERENCES technicians(id) ON DELETE SET NULL,
    created_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status inspection_status_enum DEFAULT 'pending',
    priority fault_severity_enum DEFAULT 'medium',
    scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    technician_notes TEXT,
    photo_urls TEXT[],
    repair_checklist JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. AI Predictions Table
CREATE TABLE IF NOT EXISTS predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tank_id UUID REFERENCES tanks(id) ON DELETE CASCADE,
    predicted_cleaning_date TIMESTAMP WITH TIME ZONE,
    sediment_buildup_percentage DOUBLE PRECISION DEFAULT 0.0,
    algae_growth_risk DOUBLE PRECISION DEFAULT 0.0,
    contamination_risk DOUBLE PRECISION DEFAULT 0.0,
    remaining_useful_life_days INT DEFAULT 365,
    confidence_score DOUBLE PRECISION DEFAULT 0.95,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
