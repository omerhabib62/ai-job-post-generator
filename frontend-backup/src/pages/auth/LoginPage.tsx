import { LoginForm } from "../../components/auth/LoginForm";
import { MainLayout } from "../../components/layout/MainLayout";

export const LoginPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Login to Job Post Generator
        </h1>
        <LoginForm />
      </div>
    </MainLayout>
  );
};
