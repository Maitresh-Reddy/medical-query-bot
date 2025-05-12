
import { Stethoscope } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-white dark:bg-gray-950 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-medical-primary" />
          <h1 className="text-xl font-bold text-medical-dark dark:text-white">MedicalBot</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
