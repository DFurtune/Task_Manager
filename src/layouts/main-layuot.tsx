import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/widgets/theme-toggle";

export function MainLayout() {
    return (
        <div className="min-h-screen bg-background to-foreground">
            <header className="flex items-center justify-between border-b px-6 py-4">
                <h1 className="text-lg font-semibold">Task Manager Pro</h1>
                <ThemeToggle />
            </header>

            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}