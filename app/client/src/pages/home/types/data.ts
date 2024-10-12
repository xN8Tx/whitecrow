export type TimetableObject = {
  time: string;
  subject: string;
};

export type Timetable = {
  Понедельник: TimetableObject[];
  Вторник: TimetableObject[];
  Среда: TimetableObject[];
  Четверг: TimetableObject[];
  Пятница: TimetableObject[];
};
