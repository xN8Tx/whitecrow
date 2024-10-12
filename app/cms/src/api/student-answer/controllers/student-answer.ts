/*
 * student-answer controller
 */

import { factories } from "@strapi/strapi";

type Update = (
  v: string,
  i: number,
  f: {
    data: {
      teacherReview?: string;
      psychologistReview?: string;
    };
  },
) => Promise<any>;

// Экспортируем фабрику контроллера сущности "api::student-answer.student-answer"
export default factories.createCoreController(
  "api::student-answer.student-answer",
  ({ strapi }) => ({
    // Метод создания новой записи студенческого ответа
    async create(ctx) {
      try {
        const { data } = ctx.request.body;

        // Создание новой записи студенческого ответа с указанными свойствами
        const newStudentAnswer = await strapi.entityService.create(
          "api::student-answer.student-answer",
          {
            data: {
              user: data.user,
              test: data.test,
              answers: data.answers,
            },
            populate: ["user", "test"],
          },
        );

        // Отправка ответа с информацией о созданной записи
        ctx.body = { message: newStudentAnswer };
      } catch (error) {
        // Обработка ошибки и отправка статуса 500 в случае ошибки сервера
        ctx.status = 500;
        console.log(error);
      }
    },
    // Метод поиска записей студенческих ответов по ID пользователя
    async findByUserId(ctx) {
      try {
        const userId = ctx.params.userId;

        // Поиск записей студенческих ответов по указанному ID пользователя
        const studentAnswer = await strapi.entityService.findMany(
          "api::student-answer.student-answer",
          {
            filters: {
              user: userId,
            },
            populate: ["test"],
          },
        );

        // Извлечение только ID тестов из найденных записей
        const data = studentAnswer.map((d) => d.test.id);

        // Отправка ответа с массивом ID тестов
        ctx.body = { data: data };
      } catch (error) {
        // Обработка ошибки и отправка статуса 500 в случае ошибки сервера
        ctx.status = 500;
        console.log(error);
      }
    },
    // Метод поиска записей студенческих ответов по ID теста
    async findByTestId(ctx) {
      try {
        const testId = ctx.params.testId;

        // Поиск записей студенческих ответов по указанному ID теста
        const studentAnswer = await strapi.entityService.findMany(
          "api::student-answer.student-answer",
          {
            filters: {
              test: {
                id: Number(testId),
              },
            },
            // Популяция связанных данных (тестов и пользователей)
            populate: {
              test: {
                populate: {
                  subject: true,
                },
              },
              user: {
                populate: {
                  classes: true,
                },
              },
            },
          },
        );

        // Маппинг данных для ответа
        const data = studentAnswer.map((answer) => ({
          id: answer.id,
          testId: answer.test.id,
          user: {
            id: answer.user.id,
            name: answer.user.name,
            className: answer.user.classes[0].name,
          },
        }));

        // Отправка ответа с массивом студенческих ответов
        ctx.body = { data: data };
      } catch (error) {
        // Обработка ошибки и отправка статуса 500 в случае ошибки сервера
        ctx.status = 500;
        console.log(error);
      }
    },
    // Метод поиска одной записи студенческого ответа по ID
    async findOne(ctx) {
      try {
        const id = ctx.params.id;

        // Поиск одной записи студенческого ответа по указанному ID
        const studentAnswer = await strapi.entityService.findOne(
          "api::student-answer.student-answer",
          Number(id),
          {
            // Популяция связанных данных (тестов и пользователей)
            populate: {
              test: {
                populate: {
                  subject: true,
                },
              },
              user: {
                populate: {
                  classes: true,
                },
              },
            },
          },
        );

        // Получение ID теста из найденной записи
        const testId = studentAnswer.test.id;
        // Поиск теста по его ID
        const test = await strapi.entityService.findOne(
          "api::test.test",
          Number(testId),
          {
            // Популяция связанных данных (ответов, предметов и вопросов)
            populate: {
              answers: true,
              subject: true,
              questions: {
                populate: {
                  media: true,
                },
              },
            },
          },
        );

        // Формирование данных для ответа
        const rewriteData = {
          answerId: studentAnswer.id,
          testId: test.id,
          title: test.title,
          subject: test.subject,
          question: test.questions.map((q) => ({
            id: q.id,
            title: q.title,
            media: {
              url: q.media && q.media.length !== 0 && q.media[0].url,
              type: q.media && q.media.length !== 0 && q.media[0].mime,
            },
            answers: q.answers,
          })),
          answers: studentAnswer.answers,
          teacherReview: studentAnswer.teacherReview,
          psychologistReview: studentAnswer.psychologistReview,
          user: {
            id: studentAnswer.user.id,
            name: studentAnswer.user.name,
            className: studentAnswer.user.classes[0].name,
          },
        };

        // Отправка ответа с сформированными данными
        ctx.body = { data: rewriteData };
      } catch (error) {
        // Обработка ошибки и отправка статуса 500 в случае ошибки сервера
        ctx.status = 500;
        ctx.body = { message: "Internal server error" };
        console.log(error);
      }
    },
    // Метод обновления записи студенческого ответа
    async update(ctx) {
      try {
        const id = ctx.params.id;
        const { review } = ctx.request.body;
        const userId = ctx.state.user.id;

        // Получение данных пользователя по его ID
        const userData = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          Number(userId),
          { populate: ["role"] },
        );

        // Получение роли пользователя
        const userRole = userData.role.name;

        // Формирование объекта данных для обновления записи
        const data = {} as Record<
          "teacherReview" | "psychologistReview",
          string
        >;
        if (userRole === "Teacher") data.teacherReview = review;
        if (userRole === "Psychologist") data.psychologistReview = review;
        if (userRole === "Student") throw new Error("Студент изменяет отзыв");

        console.log(data);

        // Обновление записи студенческого ответа с указанными данными
        await (strapi.entityService.update as Update)(
          "api::student-answer.student-answer",
          Number(id),
          { data },
        );

        // Отправка ответа об успешном обновлении
        ctx.body = { message: "Success" };
      } catch (error) {
        // Обработка ошибки и отправка статуса 500 в случае ошибки сервера
        ctx.status = 500;
        ctx.body = { message: "Internal server error" };
        console.log(error);
      }
    },
  }),
);
