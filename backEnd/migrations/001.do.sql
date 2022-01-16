CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(100) NOT NULL,
  email         VARCHAR(100) NOT NULL, 
  password      VARCHAR(100) NOT NULL, 
  name          VARCHAR(100) NOT NULL,
  avatar        VARCHAR(200),
  isAdmin       boolean NOT NULL,
  created_date  DATE DEFAULT (CURRENT_DATE),
  PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS highscore (
  id                 int NOT NULL AUTO_INCREMENT, 
  game               VARCHAR(100) NOT NULL,
  userId             VARCHAR(100) NOT NULL,
  difficulty         VARCHAR(100),
  score              VARCHAR(100) NOT NULL,
  created_date       DATE DEFAULT (CURRENT_DATE),
  PRIMARY KEY (id)
);
