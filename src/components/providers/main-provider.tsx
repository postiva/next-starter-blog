import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="light" enableSystem attribute="class">
      <TooltipProvider>
        <Toaster />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
};
