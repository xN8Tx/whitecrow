/**
 * timetable controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  // Создание контроллера для работы с расписанием
  "api::timetable.timetable",
  ({ strapi }) => ({
    async findByClass(ctx) {
      try {
        const className = (await ctx.params.class) as string;

        // Поиск расписания по указанному классу
        const data = await strapi.entityService.findMany(
          "api::timetable.timetable",
          {
            filters: {
              class: {
                name: className,
              },
            },
            populate: ["class", "subject"],
          }
        );

        // Переформатирование данных расписания для отправки клиенту
        const rewritteData = {};
        data.forEach((value) => {
          const isArray = Array.isArray(rewritteData[value.day]);

          const timetableObject = {
            time: value.time.split("a").pop(), // Извлечение времени из строки
            subject: value.subject.name,
          };

          rewritteData[value.day] = isArray
            ? [...rewritteData[value.day], timetableObject]
            : [timetableObject];
        });

        // Сортировка данных по времени для каждого дня недели
        const filteredData = {};
        for (let value in rewritteData) {
          const array = rewritteData[value];
          const sortedArray = array.sort((a, b) => {
            return (
              Number(`${a.time[0]}${a.time[1] !== ":" ? a.time[1] : ""}`) -
              Number(`${b.time[0]}${b.time[1] !== ":" ? b.time[1] : ""}`)
            );
          });

          filteredData[value] = sortedArray;
        }

        ctx.body = { message: filteredData }; // Отправка отформатированных данных клиенту
      } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { error: "Internal server error" };
      }
    },
  })
);
