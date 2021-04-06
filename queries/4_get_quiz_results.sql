SELECT attempts.quiztaker_name as name, attempts.quiz_id as quiz_id, count(answers.correct) as score, count(attempts_answers.*) as total
FROM attempts_answers
JOIN answers ON answers.id = answer_id
JOIN attempts ON attempts.id = attempts_id
WHERE attempts.id = 1 --replace with id in js
GROUP BY attempts.id;

-- SELECT attempts.quiztaker_name as name, attempts.quiz_id as quiz, attempts_answers.answer_id as selection, count(answers.correct = 't') as score, count(attempts_answers.*) as total
-- FROM attempts_answers
-- JOIN answers ON answers.id = answer_id
-- JOIN attempts ON attempts.id = attempts_id
-- -- WHERE attempts.id = 1 --replace with id in js
-- GROUP BY attempts.id, attempts_answers.answer_id;

-- --will need to test this one too because of all the joins
