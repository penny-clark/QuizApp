DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  creator_name VARCHAR (255) NOT NULL,
  time_created TIMESTAMP NOT NULL DEFAULT Now(),
  publicly_listed BOOLEAN DEFAULT TRUE,
  category VARCHAR(255)
);
