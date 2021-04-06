SELECT quizzes.title as quiz_name, questions.question_content as question, answers.answer_content
FROM quizzes
JOIN questions ON quizzes.id = quiz_id
JOIN answers ON questions.id = question_id
WHERE quizzes.id = 1
;

-- WILL NEED TO TEST THIS ONCE I GET THE TEMP DATA LOADED IN
