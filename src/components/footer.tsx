import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">
                &copy; 2024 Todo App. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link
                    className="text-xs hover:underline underline-offset-4"
                    prefetch={false}
                    to={'/terms'}
                >
                    Terms of Service
                </Link>
                <Link
                    className="text-xs hover:underline underline-offset-4"
                    prefetch={false}
                    to={'/impressum'}
                >
                    Impressum
                </Link>
                <Link
                    className="text-xs hover:underline underline-offset-4"
                    prefetch={false}
                    to={'/privacy'}
                >
                    Privacy
                </Link>
            </nav>
        </footer>
    );
}
