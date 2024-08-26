import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import Login from "@/routes/Login.tsx";
import TodoDashboard from "@/routes/dashboard/TodoDashboard.tsx";
import CategoriesPage from "@/routes/dashboard/CategoriesDashboard.tsx";
import ForgotPassword from "@/routes/forgot-password.tsx";
import NewPassword from "@/routes/new-password.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword/>
    },
    {
        path: '/new-password',
        element: <NewPassword/>
    },
    {
        path: '/dashboard',
        element: <TodoDashboard/>,
    },
    {
        path: '/dashboard/categories',
        element: <CategoriesPage/>
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <RouterProvider router={router}/>
        </ThemeProvider>
    </StrictMode>,
)
