import { Courses } from "@/shared/types";
import { Item } from "./Item";

type CourseListProps = {
  data: Courses[];
};

export const List = ({ data }: CourseListProps) => {
  return (
    <div className="mt-12 w-full flex flex-wrap gap-5">
      {data.map((course) => (
        <Item
          key={course.id}
          subject={course.subject}
          title={course.title}
          thumbnail={course.thumbnail}
          isPassed={course.isPassed}
          id={course.id}
        />
      ))}
    </div>
  );
};
