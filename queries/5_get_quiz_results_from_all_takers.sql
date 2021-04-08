--makes gets the names and score of each attempt on a specific quiz
SELECT attempts.quiztaker_name as name,
  count(answers.correct) as score,
  count(attempts_answers.*) as total
FROM answers
  JOIN attempts_answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
WHERE attempts.quiz_id = 2 --replace with id in js
GROUP BY attempts.id;
