export interface User {
	_id?: string,
	name: string,
    email: string,
    role: string,
    notifications: Notification[] | string[],
    taskID: Task[] | string[],
    createdAt?: string,
	updatedAt?: string,
}

export interface Task {
	_id?: string,
	title: string,
	description: string,
	status: string,
	assignedTo?: string,
	observer?: string,
	projectID: string,
	dueDate?: Date | null,
    priority: string,
	tags: string[],
	suTtasks: string[],
	createdAt?: string,
	updatedAt?: string,
}

export interface Notification {
    _id?: string,
    message: string,
    taskID: string,
    createdAt?: Date,
    updatedAt?: string,
}