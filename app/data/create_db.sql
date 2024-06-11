BEGIN;

DROP TABLE IF EXISTS 
"categories",
"posts";

-- -------------------
-- Table "categories"
-- -------------------
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

-- -------------------
-- Table "posts"
-- -------------------
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    categoryId INT NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(50) NOT NULL,
    excerpt TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

COMMIT;
