SELECT attempts.quiz_id as quiz, sum(answers.correct) / sum(attempts_answers.*) as average
FROM attempts
JOIN attempts_answers ON attempts.id = attempt_id
JOIN answers ON answers.id = answer_id
WHERE attempts.quiz_id = 2 --replace with id in js
GROUP BY attempts.quiz_id;
--WORK IN PROGRESS
