import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-1px)]">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
