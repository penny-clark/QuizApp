-- Render the home page with most recent quizzes
SELECT id, title
FROM quizzes
WHERE publicly_listed = 'true'
ORDER BY time_created DESC
LIMIT 10;
