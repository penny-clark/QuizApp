DROP TABLE IF EXISTS attempts_answers CASCADE;
CREATE TABLE attempts_answers (
  id SERIAL PRIMARY,
  attempts_id INTEGER NOT NULL REFERENCES results(id),
  answer_id INTEGER NOT NULL REFERENCES answers(id),
);
