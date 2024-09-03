import {StrictMode, useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import Login from "@/routes/Login.tsx";
import TodoDashboard from "@/routes/dashboard/TodoDashboard.tsx";
import CategoriesPage from "@/routes/dashboard/CategoriesDashboard.tsx";
import ForgotPassword from "@/routes/forgot-password.tsx";
import NewPassword from "@/routes/new-password.tsx";
import {AuthProvider} from "@/context/auth-context.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import Preloader from "@/components/preloader.tsx";

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

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handlePageLoad = () => {
            setLoading(false);
        };

        window.addEventListener('load', handlePageLoad);

        return () => {
            window.removeEventListener('load', handlePageLoad);
        };
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
                <RouterProvider router={router}/>
                <Toaster/>
            </ThemeProvider>
        </AuthProvider>
    );
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
