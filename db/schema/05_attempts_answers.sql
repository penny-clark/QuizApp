DROP TABLE IF EXISTS attempts_answers CASCADE;
CREATE TABLE attempts_answers (
  id SERIAL PRIMARY KEY,
  attempt_id INTEGER NOT NULL REFERENCES attempts(id),
  answer_id INTEGER NOT NULL REFERENCES answers(id)
);
