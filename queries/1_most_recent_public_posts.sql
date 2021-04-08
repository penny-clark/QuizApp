-- Render the home page with most recent quizzes
SELECT title, creator_name, id
FROM quizzes
WHERE publicly_listed = 'true'
ORDER BY time_created DESC
LIMIT 10;
