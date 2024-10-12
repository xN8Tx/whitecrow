module.exports = {
  // Маршруты для обработки запросов к студенческим ответам по ID пользователя и ID теста
  routes: [
    {
      method: "GET",
      path: "/student-answer/:userId",
      handler: "student-answer.findByUserId", // Обработчик запроса для поиска ответов по ID пользователя
    },
    {
      method: "GET",
      path: "/student-answer-test/:testId",
      handler: "student-answer.findByTestId", // Обработчик запроса для поиска ответов по ID теста
    },
  ],
};
