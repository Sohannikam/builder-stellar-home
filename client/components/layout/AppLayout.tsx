import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export default function AppLayout({
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b">
        <div className="container flex h-14 items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-extrabold tracking-tight text-lg"
          >
            <span className="inline-block h-6 w-6 rounded-md bg-primary"></span>
            <span>EmpowerHR</span>
          </a>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="hidden sm:block">Employee Management</span>
          </nav>
        </div>
      </header>
      <main className={cn("container py-8")}>{children}</main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container">© {new Date().getFullYear()} EmpowerHR</div>
      </footer>
    </div>
  );
}
