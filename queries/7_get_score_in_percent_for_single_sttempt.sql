SELECT attempts.quiztaker_name as name, attempts.quiz_id as quiz_id, count(answers.correct) / count(attempts_answers.*) as average
FROM attempts_answers
JOIN answers ON answers.id = answer_id
JOIN attempts ON attempts.id = attempt_id
WHERE attempts.id = 1 --replace with id in js
GROUP BY attempts.id;