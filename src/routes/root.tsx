import {Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from "@/components/ui/carousel"
import {Card, CardContent} from "@/components/ui/card"
import {Link} from "react-router-dom";
import {Footer} from "@/components/footer.tsx";

export default function Root() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
                <Link className="flex items-center justify-center" prefetch={false} to='/'>
                    <CheckIcon className="h-6 w-6"/>
                    <span className="text-xl font-bold">Todo App</span>
                </Link>
                <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                    to={'/login'}>
                    Login
                </Link>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Effortless Task Management
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Streamline your productivity with our powerful todo app. Stay organized, track
                                        progress, and achieve
                                        your goals.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link
                                        to='/login'
                                        href="#"
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        prefetch={false}
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href="#"
                                        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        prefetch={false}
                                        to={'#'}>
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <Carousel className="w-full max-w-xs">
                                <CarouselContent>
                                    <CarouselItem>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent
                                                    className="flex aspect-square items-center justify-center p-6">
                                                    <img
                                                        src="/placeholder.svg"
                                                        alt="Todo App Screenshot"
                                                        width={300}
                                                        height={300}
                                                        className="rounded-lg"
                                                        style={{aspectRatio: "300/300", objectFit: "cover"}}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent
                                                    className="flex aspect-square items-center justify-center p-6">
                                                    <img
                                                        src="/placeholder.svg"
                                                        alt="Todo App Screenshot"
                                                        width={300}
                                                        height={300}
                                                        className="rounded-lg"
                                                        style={{aspectRatio: "300/300", objectFit: "cover"}}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent
                                                    className="flex aspect-square items-center justify-center p-6">
                                                    <img
                                                        src="/placeholder.svg"
                                                        alt="Todo App Screenshot"
                                                        width={300}
                                                        height={300}
                                                        className="rounded-lg"
                                                        style={{aspectRatio: "300/300", objectFit: "cover"}}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious/>
                                <CarouselNext/>
                            </Carousel>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container space-y-12 px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your
                                    Productivity</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our todo app offers a range of powerful features to help you stay organized and on
                                    top of your tasks.
                                </p>
                            </div>
                        </div>
                        <div
                            className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Intuitive Interface</h3>
                                <p className="text-sm text-muted-foreground">
                                    Our clean and user-friendly interface makes it easy to manage your tasks.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Task Scheduling</h3>
                                <p className="text-sm text-muted-foreground">
                                    Schedule tasks with due dates and set reminders to stay on top of your priorities.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Progress Tracking</h3>
                                <p className="text-sm text-muted-foreground">
                                    Monitor your progress and see how much you've accomplished.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Collaboration</h3>
                                <p className="text-sm text-muted-foreground">
                                    Invite team members to collaborate on shared tasks and projects.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Mobile Access</h3>
                                <p className="text-sm text-muted-foreground">Stay productive on-the-go with our
                                    mobile-friendly app.</p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Customization</h3>
                                <p className="text-sm text-muted-foreground">
                                    Personalize your experience with custom themes and layouts.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

function CheckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5"/>
        </svg>
    )
}