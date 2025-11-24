CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS generations (
    id SERIAL PRIMARY KEY,
    prompt TEXT NOT NULL,
    language VARCHAR(100) NOT NULL, -- required by assignment
    code TEXT NOT NULL,
    language_id INTEGER REFERENCES languages(id),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO languages (name, code)
VALUES
    ('Python', 'python'),
    ('JavaScript', 'javascript'),
    ('C++', 'cpp'),
    ('TypeScript', 'typescript')
ON CONFLICT (code) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_generations_created_at
    ON generations (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_generations_language
    ON generations (language);

CREATE INDEX IF NOT EXISTS idx_generations_user_id
    ON generations (user_id);
