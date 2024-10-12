import { HelloSection } from "./HelloSection";
import { Form } from "./Form";

export const Wrapper = () => {
  return (
    <main className="w-full h-screen flex flex-col md:flex-row items-center">
      <HelloSection />
      <Form />
    </main>
  );
};
