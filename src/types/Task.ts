export interface Task {
    todoId: number
    ownerId: number
    categoryId?: number
    title: string
    description?: string
    deadline?: Date
    priority?: string
    status?: string
    pinned?: boolean
    startedOn?: Date
    finishedOn?: Date
}