module.exports = {
  routes: [
    // Маршрут для запроса списка тестов по классу
    {
      method: "GET",
      path: "/test/:class",
      handler: "test.findByClass",
    },
  ],
};
