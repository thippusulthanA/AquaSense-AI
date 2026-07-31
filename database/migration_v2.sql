-- AquaSense-AI v2.0 Database Schema Migration Script

-- 1. Add Dispenser Tracking Tables & Columns to PostgreSQL Schema
CREATE TABLE IF NOT EXISTS dispensers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    location_building VARCHAR(100) NOT NULL,
    health_index DOUBLE PRECISION DEFAULT 100.0,
    status VARCHAR(50) DEFAULT 'Healthy',
    predicted_rul_days DOUBLE PRECISION DEFAULT 120.0,
    failure_attribution TEXT DEFAULT 'Normal Operating Conditions',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial dispensers into migration
INSERT INTO dispensers (code, location_building, health_index, status, predicted_rul_days, failure_attribution)
VALUES 
('WD-001', 'Student Union Center', 98.5, 'Healthy', 115, 'Normal Operating Conditions'),
('WD-002', 'Computer Science Dept', 68.4, 'Warning', 18, 'Filter Clogging & Flow Restriction'),
('WD-005', 'Medical Sciences Wing', 42.0, 'Critical', 3.5, 'Pump Overheating & Mechanical Friction'),
('WD-003', 'Library Reading Hall', 95.2, 'Healthy', 102, 'Normal Operating Conditions')
ON CONFLICT (code) DO NOTHING;

-- 2. Audit Trail Log for 8 Sub-Agents
CREATE TABLE IF NOT EXISTS subagent_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_number INT NOT NULL,
    agent_name VARCHAR(150) NOT NULL,
    cluster VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    metric_output TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
