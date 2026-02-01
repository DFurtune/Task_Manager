import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/main-layuot";
import { TasksPage } from  "@/pages/tasks-page"
import { DashboardPage } from "@/pages/dashboard-page"

export const router = createBrowserRouter([
    {
        element: <MainLayout/>,
        children: [
            { path: '/', element: <DashboardPage /> },
            { path: '/tasks', element: <TasksPage /> },
        ]
    }
])