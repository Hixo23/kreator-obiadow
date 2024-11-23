import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-1px)]">
      <SignIn />
    </div>
  );
}

export default SignInPage;
