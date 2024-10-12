module.exports = {
  routes: [
    // Определение маршрута для получения расписания по указанному классу
    {
      method: "GET",
      path: "/timetable/:class",
      handler: "timetable.findByClass", // Обработчик запроса
    },
  ],
};
