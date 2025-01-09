import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-1px)] items-center justify-center">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
