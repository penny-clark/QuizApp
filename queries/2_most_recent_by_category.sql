-- Render homepage based on the search criterea provided altering the query request

SELECT id, title
FROM quizzes
WHERE publicly_listed = 'true'
AND catagory = 'history' --example
ORDER BY time_created
LIMIT 10;

-- For JS
-- const getQuizByCategory = function(email) {
--     return pool.query(`
--     SELECT id, title
--   FROM quizzes
--   WHERE publicly_listed = 'true'
--   AND catagory = '$1'
--   ORDER BY time_created
--   LIMIT 10
--     `, [category])
--     .then(res => {
--       console.log(res.rows)
--       const user = res.rows[0] || null;
--       return user;
--     })
--   }
