import { RegisterForm } from "../../components/auth/RegisterForm";
import { MainLayout } from "../../components/layout/MainLayout";

export const RegisterPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create an Account
        </h1>
        <RegisterForm />
      </div>
    </MainLayout>
  );
};
