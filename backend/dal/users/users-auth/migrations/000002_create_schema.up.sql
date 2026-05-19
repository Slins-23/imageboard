CREATE TABLE users_auth (
  id UUID PRIMARY KEY,
  username VARCHAR(15) COLLATE case_insensitive UNIQUE NOT NULL,
  password VARCHAR(72) NOT NULL,
  email VARCHAR(254) COLLATE case_insensitive UNIQUE NOT NULL
);
