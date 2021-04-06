//get most recent public quizzes for the homepage
const getRecentQuizzes = function() {
  return pool.query(`
  SELECT id, title
  FROM quizzes
  WHERE publicly_listed = 'true'
  ORDER BY time_created DESC
  LIMIT 10;
  `)
  .then(res => res.rows);
}

//gets the quiz fields based on quiz id
const getQuizById = function(quiz_id) {
  return pool.query(`
  SELECT quizzes.title as quiz_name, questions.question_content as question, answers.answer_content
  FROM quizzes
  JOIN questions ON quizzes.id = quiz_id
  JOIN answers ON questions.id = question_id
  WHERE quizzes.id = $1`, [quiz_id])
  .then(res => {
    const quiz = res.rows || null;
    return quiz;
  })
}

//get the score (in points) for a single attempt
const getAttemptsResults = function(attempt_id) {
  return pool.query(`
  SELECT attempts.quiztaker_name as name, attempts.quiz_id as quiz_id, count(answers.correct) as score, count(attempts_answers.*) as total
  FROM attempts_answers
  JOIN answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.id = $1
  GROUP BY attempts.id`, [attempt_id])
  .then(res => {
    const attemptScore = res.rows[0] || null;
    return attemptScore;
  })
}

//get quiz results for all takers of a single quiz
const getAllResultsForQuiz = function(quiz_id) {
  return pool.query(`
  SELECT attempts.quiztaker_name as name, count(answers.correct) as score, count(attempts_answers.*) as total
  FROM answers
  JOIN attempts_answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.quiz_id = $1
  GROUP BY attempts.id`, [quiz_id])
  .then(res => {
    const allResults = res.rows || null;
    return allResults;
  })
}

//get the average score of all takers for a quiz
const getQuizTotalAverage = function(quiz_id) {
  return pool.query(`
  SELECT ROUND(sum(correct) / count(total) * 100) as average
  FROM (SELECT attempts.quiz_id as quiz_id, count(answers.correct) as correct, count(attempts_answers.*) as total
  FROM attempts_answers
  JOIN answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.quiz_id = $1
  GROUP BY attempts.id) as singlescores`, [quiz_id])
  .then(res => {
    const quizAverage = res.rows[0] || null;
    return quizAverage;
  })
}
