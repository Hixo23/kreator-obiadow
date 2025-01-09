import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-1px)] items-center justify-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
