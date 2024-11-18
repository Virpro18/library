import LoginInput from "@/components/lib/LoginInput";

const Verify = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="sm:scale-125 p-4">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Login</h3>
        <LoginInput />
      </div>
    </div>
  );
};

export default Verify;
