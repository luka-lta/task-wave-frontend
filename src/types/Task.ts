import {Category} from "@/types/Category.ts";

export interface Task {
    todoId: number
    ownerId: number
    category?: Category
    title: string
    description?: string
    deadline?: Date
    priority?: string
    status?: string
    pinned?: boolean
    startedOn?: Date
    finishedOn?: Date
}