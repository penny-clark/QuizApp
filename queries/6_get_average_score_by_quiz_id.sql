--query to get the average score of all attempts on a quiz

SELECT ROUND(sum(correct) / count(total) * 100) as average
FROM (SELECT attempts.quiz_id as quiz_id, count(answers.correct) as correct, count(attempts_answers.*) as total
FROM attempts_answers
JOIN answers ON answers.id = answer_id
JOIN attempts ON attempts.id = attempt_id
WHERE attempts.quiz_id = 2 --replace with whatever id in js
GROUP BY attempts.id) as singlescores;
