import { Loader2 } from "lucide-react"

export default function Preloader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="text-center">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p className="mt-4 text-lg font-medium text-primary">Loading...</p>
            </div>
        </div>
    )
}