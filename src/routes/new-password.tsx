import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Footer} from "@/components/footer.tsx";

export default function NewPassword() {
    return (
        <>
            <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Reset Password</h1>
                    <p className="text-muted-foreground">Enter your email and a new password to reset your account.</p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" type="password" required/>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Repeat new Password</Label>
                        <Input id="password" type="password" required/>
                    </div>

                    <Button type="submit" className="w-full">
                        Reset Password
                    </Button>
                </form>

            </div>
            <Footer/>
        </>
    )
}