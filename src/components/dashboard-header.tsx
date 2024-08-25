import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Settings, LogOut, CheckSquare, List} from 'lucide-react'
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import ProfileSettings from "@/components/profile-settings.tsx";
import {Button} from "@/components/ui/button.tsx";

interface DashboardHeaderProps {
    title: string
    userAvatarUrl?: string
}

export default function DashboardHeader({
                                            title,
                                            userAvatarUrl = 'https://picsum.photos/40/40',
                                        }: DashboardHeaderProps) {
    const navigate = useNavigate()
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const handleLogout = () => {
        // Implement your logout logic here
        // For example, clear local storage, reset state, etc.
        navigate('/login')
    }

    return (
        <>
            <header className="bg-primary text-primary-foreground py-4 px-6 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <Link to='/'><h1 className="text-2xl font-bold">{title}</h1></Link>
                    <nav className="flex space-x-4">
                        <Button variant="ghost" asChild>
                            <Link to="/dashboard" className="flex items-center">
                                <CheckSquare className="mr-2 h-4 w-4" />
                                ToDos
                            </Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link to="/dashboard/categories" className="flex items-center">
                                <List className="mr-2 h-4 w-4" />
                                Categories
                            </Link>
                        </Button>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <ModeToggle/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="w-10 h-10 cursor-pointer">
                                <AvatarImage src={userAvatarUrl} alt="User avatar" style={{borderRadius: '50%'}}/>
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => setIsProfileOpen(true)}>
                                <Settings className="mr-2 h-4 w-4"/>
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4"/>
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Profile Settings</DialogTitle>
                        <DialogDescription>
                            Update your profile information here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileSettings/>
                </DialogContent>
            </Dialog>
        </>
    )
}