//get most recent public quizzes for the homepage
const getRecentQuizzes = function () {
  return pool
    .query(
      `
  SELECT id, title
  FROM quizzes
  WHERE publicly_listed = 'true'
  ORDER BY time_created DESC
  LIMIT 10;
  `
    )
    .then((res) => res.rows);
};

//gets the quiz fields based on quiz id
const getQuizById = function (quiz_id) {
  return pool
    .query(
      `
  SELECT quizzes.title as quiz_name, questions.question_content as question, answers.answer_content
  FROM quizzes
  JOIN questions ON quizzes.id = quiz_id
  JOIN answers ON questions.id = question_id
  WHERE quizzes.id = $1`,
      [quiz_id]
    )
    .then((res) => {
      const quiz = res.rows || null;
      return quiz;
    });
};

//get the score (in points) for a single attempt
const getAttemptsResults = function (attempt_id) {
  return pool
    .query(
      `
  SELECT attempts.quiztaker_name as name, attempts.quiz_id as quiz_id, count(answers.correct) as score, count(attempts_answers.*) as total
  FROM attempts_answers
  JOIN answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.id = $1
  GROUP BY attempts.id`,
      [attempt_id]
    )
    .then((res) => {
      const attemptScore = res.rows[0] || null;
      return attemptScore;
    });
};

//get single attempt score as a percentage
const getAttemptScorePercentage = function (attempt_id) {
  return pool
    .query(
      `
  SELECT attempts.quiztaker_name as name, attempts.quiz_id as quiz_id, (count(answers.correct) / count(attempts_answers.*)) * 100 as average
  FROM attempts_answers
  JOIN answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.id = $1
  GROUP BY attempts.id`,
      [attempt_id]
    )
    .then((res) => {
      const attemptScore = res.rows[0] || null;
      return attemptScore;
    });
};

//get quiz results for all takers of a single quiz
const getAllResultsForQuiz = function (quiz_id) {
  return pool
    .query(
      `
  SELECT attempts.quiztaker_name as name, count(answers.correct) as score, count(attempts_answers.*) as total
  FROM answers
  JOIN attempts_answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.quiz_id = $1
  GROUP BY attempts.id`,
      [quiz_id]
    )
    .then((res) => {
      const allResults = res.rows || null;
      return allResults;
    });
};

//get the average score of all takers for a quiz
const getQuizTotalAverage = function (quiz_id) {
  return pool
    .query(
      `
  SELECT ROUND(sum(correct) / count(total) * 100) as average
  FROM (SELECT attempts.quiz_id as quiz_id, count(answers.correct) as correct, count(attempts_answers.*) as total
  FROM attempts_answers
  JOIN answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.quiz_id = $1
  GROUP BY attempts.id) as singlescores`,
      [quiz_id]
    )
    .then((res) => {
      const quizAverage = res.rows[0] || null;
      return quizAverage;
    });
};

//add a new quiz to the quizzes database
const addQuiz = function (newquiz) {
  return pool
    .query(
      `INSERT INTO quizzes (title, creator_name, publicly_listed, category)
  VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [newquiz.title, newquiz.creatorname, newquiz.public, newquiz.category]
    )
    .then((res) => {
      const newquiz = res.rows[0];
      console.log(newquiz); //console log for testing
      return newquiz;
    });
};

//add a new question to questions database
//WHETHER THIS WORKS OR NOT WILL DEPEND ON WHETHER THE QUIZ ID CAN BE PASSED
//IN A PROMISE CHAIN THIS WAY (or with adjusted syntax)
//SAME GOES FOR THE addAnswer FUNCTIONS
const addQuestion = function (newquestion) {
  return pool
    .query(
      `INSERT INTO questions (quiz_id, question_content)
  VALUES (${newquiz.id}, $1,) RETURNING *;`,
      [newquestion.content]
    )
    .then((res) => {
      const newquestion = res.rows[0];
      console.log(newquestion); //console log for testing
      return newquestion;
    });
};

//add a correct answer to answers database
//We'll need to pass the question id to the other answers in the chain too
//not sure if we can do this by returning the newquestion again in the .then
//or by accessing the question_id field of the previously returned answer
const addCorrectAnswer = function (correctanswer) {
  return pool
    .query(
      `INSERT INTO answers (question_id, answer_content, correct)
  VALUES (${newquestion.id}, $1, 'true') RETURNING *;`,
      [correctanswer.content]
    )
    .then((res) => {
      const correctAnswer = res.rows[0];
      console.log(correctAnswer); //console log for testing
      return correctAnswer;
    });
};

const addIncorrectAnswer = function (incorrectanswer) {
  return pool
    .query(
      `INSERT INTO answers (question_id, answer_content)
  VALUES (${newquestion.id}, $1) RETURNING *;`,
      [incorrectanswer.content]
    )
    .then((res) => {
      const incorrectAnswer = res.rows[0];
      console.log(incorrectAnswer); //console log for testing
      return incorrectAnswer;
    });
};
