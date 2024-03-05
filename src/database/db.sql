CREATE DATABASE tasks-organizer

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status BOOLEAN DEFAULT FALSE
);