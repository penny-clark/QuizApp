SELECT attempts.quiztaker_name as name, count(answers.correct = 'true') as score, count(attempts_answers.*) as total
FROM answers
JOIN attempts_answers ON answers.id = answer_id
JOIN attempts ON attempts.id = attempts_id
WHERE attempts.id = 1 --replace with id in js
GROUP BY attempts;

--will need to test this one too because of all the joins
