import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Toaster } from "react-hot-toast";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} AI Job Post Generator</p>
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
};
