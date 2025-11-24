import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import { Toaster } from "sonner";

export const metadata = {
  title: "Mini Code Copilot",
  description: "Minimal full-stack code generation copilot"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
        <ThemeProvider>
          <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 dark:from-blue-950/20 dark:via-slate-950 dark:to-purple-950/20 pointer-events-none transition-colors duration-300" />
          
          <div className="relative max-w-6xl mx-auto px-4 py-6">
            {children}
            <Toaster position="top-right" richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}