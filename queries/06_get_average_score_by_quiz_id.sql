SELECT avg(SELECT answers.correct
FROM answers
JOIN attempts_answers on answers.id = answer_id
JOIN attempts ON attempts.id = attempts_id
WHERE attempts.quiz_id = 2 --replace with id in js)
) as average_score,
sum(attempts_answers.*) as total
FROM attempts_answers
JOIN attempts ON attempts.id = attempts_id
WHERE attempts.quiz_id = 2 --replace with id in js
GROUP BY attempts.id;
