import Learning from "../assets/videos/Learning.mp4";

export const HelloSection = () => {
  return (
    <div className="hidden md:flex w-1/3 h-full bg-[#51C3F9] flex-col items-center justify-center">
      <div className="h-full md:h-1/2 px-3 flex flex-col justify-center items-center text-center gap-3">
        <h2 className="text-white text-3xl font-extrabold">Привет, друг👋</h2>

        <p className="text-sky-100 text-xl max-w-lg md:max-w-[350px]">
          Рад, что ты снова рвешься к знаниям, у тебя все обязательно получится!
        </p>
      </div>
      <div className="h-1/2 block">
        <video
          className="max-h-full w-full"
          src={Learning}
          muted
          autoPlay
        ></video>
      </div>
    </div>
  );
};
