/**
 * test controller
 */

import { factories } from "@strapi/strapi";
import { CreateCourse, Question } from "../types/custom";

// Функция для создания фильтров по классам и предметам
const andFilters = (
  classes: Array<string>,
  subjects: Array<string>,
  role: string
) => {
  const filtersArray = [];

  // Фильтр по классам
  filtersArray.push({
    classes: {
      $or: classes.map((cl) => ({ name: cl })),
    },
  });

  // Добавление фильтра по предметам, если пользователь не психолог
  if (role !== "Psychologist") {
    filtersArray.push({
      subject: {
        $or: subjects.map((sub) => ({ name: sub })),
      },
    });
  }

  return filtersArray;
};

export default factories.createCoreController(
  "api::test.test",
  ({ strapi }) => ({
    // Обработчик запроса для поиска тестов по классу
    async findByClass(ctx) {
      try {
        const className = ctx.params.class;

        const data = await strapi.entityService.findMany("api::test.test", {
          filters: { classes: { name: className } },
          populate: ["subject", "classes", "questions", "thumbnail"],
        });

        // Переформатирование данных тестов
        const rewriteData = data.map((value) => {
          return {
            id: value.id,
            title: value.title,
            class: className,
            subject: value.subject.name,
            thumbnail: value.thumbnail.url,
            questions: value.questions,
          };
        });

        ctx.body = { data: rewriteData };
      } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { message: "Internal server error" };
      }
    },
    // Обработчик запроса для поиска одного теста по ID
    async findOne(ctx) {
      try {
        const id = ctx.params.id;

        const data = await strapi.entityService.findOne(
          "api::test.test",
          Number(id),
          {
            populate: {
              subject: true,
              classes: true,
              thumbnail: true,
              questions: {
                populate: {
                  media: true,
                },
              },
            },
          }
        );

        // Переформатирование данных теста
        const rewriteData = {
          id: data.id,
          title: data.title,
          class: data.classes.map((c) => c.name),
          subject: data.subject.name,
          thumbnail: data.thumbnail.url,
          question: data.questions.map((q) => ({
            id: q.id,
            title: q.title,
            media: {
              url: q.media && q.media.length !== 0 && q.media[0].url,
              type: q.media && q.media.length !== 0 && q.media[0].mime,
            },
            answers: q.answers,
          })),
        };

        ctx.body = { data: rewriteData };
      } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { message: "Internal server error" };
      }
    },
    // Обработчик запроса для поиска тестов в соответствии с данными пользователя
    async find(ctx) {
      try {
        const userId = ctx.state.user.id;

        const userData = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          userId,
          {
            populate: ["subjects", "classes", "role"],
          }
        );

        const classes: Array<string> = userData.classes.map((cl) => cl.name);
        const subjects: Array<string> = userData.subjects.map(
          (sub) => sub.name
        );
        const role = userData.role.name;

        // Поиск тестов с учетом классов, предметов и роли пользователя
        const coursesData = await strapi.entityService.findMany(
          "api::test.test",
          {
            filters: {
              $and: andFilters(classes, subjects, role),
            },
            populate: ["subject", "classes", "questions", "thumbnail"],
          }
        );

        // Переформатирование данных найденных тестов
        const rewriteData = coursesData.map((value) => {
          return {
            id: value.id,
            title: value.title,
            class: value.classes.map((c) => c.name),
            subject: value.subject.name,
            thumbnail: value.thumbnail.url,
          };
        });

        ctx.body = { data: rewriteData };
      } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { message: "Internal server error" };
      }
    },
    // Обработчик запроса для создания нового теста
    async create(ctx) {
      try {
        const body = ctx.request.body;

        const { title, className, subject, thumbnail, question } =
          body as CreateCourse;

        // Функция для добавления вопроса в базу данных
        const addQuestion = async (q: Question) =>
          await strapi.entityService.create("api::question.question", {
            data: {
              title: q.title,
              answers: q.answers,
              media: q.media,
            },
          });

        const questionsAction = question.map((q) => addQuestion(q));
        const result = await Promise.all(questionsAction);

        // Создание нового теста
        const testResponse = await strapi.entityService.create(
          "api::test.test",
          {
            data: {
              title: title,
              classes: [Number(className.id)],
              subject: Number(subject.id),
              thumbnail: thumbnail,
              questions: result.map((q) => q.id),
            },
            populate: {
              classes: true,
              subject: true,
            },
          }
        );

        ctx.body = { message: testResponse };
      } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { message: "Internal server error" };
      }
    },
  })
);
