--query to select all of a quiz's fields based on the quiz id
SELECT DISTINCT quizzes.title as quiz_name, questions.question_content as question,
(SELECT answers.answer_content FROM answers
JOIN questions on question_id = questions.id
WHERE questions.quiz_id = 1 AND answers.correct = 'true') as correctanswer,
(SELECT answers.answer_content FROM answers
JOIN questions on question_id = questions.id
WHERE questions.quiz_id = 1 AND answers.correct IS NULL) as wronganswer
FROM quizzes
JOIN questions ON quizzes.id = quiz_id
JOIN answers ON questions.id = question_id
WHERE quizzes.id = 1;

