import LoginInput from "@/components/lib/LoginInput";
const verify = () => {


  return (
    <div className="w-full h-screen flex flex-col items-center justify-center sm:scale-150 gap-2">
      <h3 className="text-2xl font-bold">Login</h3>
      <LoginInput />
    </div>
  );
};

export default verify;
