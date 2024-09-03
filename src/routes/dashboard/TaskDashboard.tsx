import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {Plus} from "lucide-react"
import DashboardHeader from "@/components/dashboard-header.tsx";
import { Footer } from "@/components/footer.tsx";
import TaskItem from "@/components/items/TaskItem.tsx";
import { useTasks } from "@/hooks/useTasks";
import AddTaskDialog from "@/components/dialog/task/add-task.tsx";

export default function TaskDashboard() {
    const { tasks, isLoading, addTask } = useTasks([]);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <>
            <DashboardHeader title={'Tasks'} />
            <div className="container mx-auto p-4">
                <Button onClick={() => setIsAddDialogOpen(true)} className="mb-4">
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
                <div className="space-y-4">
                    {tasks
                        .sort((a, b) => (b.pinned ? 1 : -1))
                        .map((todo) => (
                            <div key={todo.todoId}>
                                <TaskItem
                                    todo={todo}
                                />

                                {/*<CardFooter className="flex justify-end space-x-2">*/}
                                {/*    <Button variant="outline" size="icon">*/}
                                {/*        <PencilIcon className="h-4 w-4" />*/}
                                {/*    </Button>*/}
                                {/*    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>*/}
                                {/*        <AlertDialogTrigger asChild>*/}
                                {/*            <Button variant="destructive" size="icon">*/}
                                {/*                <TrashIcon className="h-4 w-4" />*/}
                                {/*            </Button>*/}
                                {/*        </AlertDialogTrigger>*/}
                                {/*        <AlertDialogContent>*/}
                                {/*            <AlertDialogHeader>*/}
                                {/*                <AlertDialogTitle>Are you sure you want to delete this Task?</AlertDialogTitle>*/}
                                {/*            </AlertDialogHeader>*/}
                                {/*            <AlertDialogFooter>*/}
                                {/*                <AlertDialogCancel>Cancel</AlertDialogCancel>*/}
                                {/*                <AlertDialogAction>Delete</AlertDialogAction>*/}
                                {/*            </AlertDialogFooter>*/}
                                {/*        </AlertDialogContent>*/}
                                {/*    </AlertDialog>*/}
                                {/*</CardFooter>*/}
                            </div>
                        ))}
                </div>
            </div>

            <AddTaskDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAddTask={addTask}
                isLoading={isLoading}
            />
            <Footer />
        </>
    );
}