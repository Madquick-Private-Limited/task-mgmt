import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from '@/hooks/use-media-query.ts';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as type from "@/types"
import { useRef, useState } from "react";
import { SelectComp } from "./SelectComp";
import { Textarea } from "./ui/textarea";

export function Task({ task }: { task: type.Task }) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const statusColor = useRef(task.status === 'PENDING' ? 'bg-gray-500'
        : (task.status === 'COMPLETED' ? 'bg-green-500'
            : (task.status === 'OVERDUE' ? 'bg-red-500'
                : 'bg-yellow-500'))).current

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button>
                        <div className='flex flex-col text-left gap-2 w-72 h-60 rounded-lg border-4 border-transparent hover:border-orange-600/50 p-3 bg-orange-100/50 hover:bg-orange-200 hover:shadow-lg shadow-black duration-200 transition-all backdrop-blur-sm' >
                            <div className="text-nowrap text-ellipsis overflow-clip">{task.title}</div>
                            <div className={`rounded-sm px-1 font-semibold text-white text-sm w-fit ${statusColor}`}>{task.status}</div>
                            <div className="overflow-hidden">{task.description}</div>
                        </div>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                        <DialogDescription>
                            Editing task will send a notification to the all user involved.
                        </DialogDescription>
                    </DialogHeader>
                    {/* @ts-ignore */}
                    <ProfileForm task={task} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <button>
                    <div className='flex flex-col text-left gap-2 w-72 h-60 rounded-lg border-2 border-transparent hover:border-black p-3 bg-orange-200 hover:bg-orange-300 hover:shadow-lg shadow-black duration-200 transition-all' >
                        <div className="text-nowrap text-ellipsis overflow-clip">{task.title}</div>
                        <div className={`rounded-sm px-1 font-semibold text-sm w-fit ${statusColor}`}>{task.status}</div>
                        <div className="overflow-hidden">{task.description}</div>
                    </div>
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit Task</DrawerTitle>
                    <DrawerDescription>
                        Editing task will send a notification to the all user involved.
                    </DrawerDescription>
                </DrawerHeader>
                {/* @ts-ignore */}
                <ProfileForm className="px-4" task={task} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ task, className }: { task: type.Task, className: string }) {
    const [dueDate, setDueDate] = useState<Date | null>(task.dueDate ?? null);

    return (
        <form className={cn("grid items-start gap-4", className)}>
            {/* Title */}
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" defaultValue={task.title} />
            </div>

            {/* Description */}
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={task.description} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <SelectComp value={task.status} items={["🟡PENDING", "🟢COMPLETED", "🔴OVERDUE", "🟣IN PROGRESS"]} />
                </div>
                {/* Priority */}
                <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <SelectComp value={task.priority} items={["🔽LOW", "🔼MEDIUM", "❗HIGH"]} />
                </div>
            </div>

            {/* Assigned To */}
            <div className="grid gap-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Input id="assignedTo" defaultValue={task.assignedTo ?? ""} />
            </div>

            {/* Observer */}
            <div className="grid gap-2">
                <Label htmlFor="observer">Observer</Label>
                <Input id="observer" defaultValue={task.observer ?? ""} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Project ID */}
                <div className="grid gap-2">
                    <Label htmlFor="projectID">Project ID</Label>
                    <Input id="projectID" defaultValue={task.projectID} readOnly />
                </div>
                {/* Tags (Array) */}
                <div className="grid gap-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input id="tags" defaultValue={task.tags.join(", ")} />
                </div>
            </div>

            {/* Subtasks (Array) */}
            <div className="grid gap-2">
                <Label htmlFor="subtasks">Subtasks</Label>
                {/* <Input id="subtasks" defaultValue={task.suTtasks.join(", ")} /> */}
            </div>

            {/* Due Date (Using Date Picker) */}
            <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                {task.dueDate &&
                    <Input
                        id="dueDate"
                        type="date"
                        value={dueDate ? dueDate.toString().split("T")[0] : ""}
                        onChange={(e) => setDueDate(new Date(e.target.value))}
                    />}
            </div>

            <div className="grid grid-cols-2">
                {/* Created At (Readonly) */}
                <div className="grid grid-cols-2 opacity-40 hover:opacity-80 duration-200 transition-opacity">
                    <Label htmlFor="createdAt">Created At :</Label>
                    <Label id="createdAt">{task.createdAt?.toString().split("T")[0]}</Label>
                </div>
                {/* Updated At (Readonly) */}
                <div className="grid grid-cols-2 opacity-40 hover:opacity-80 duration-200 transition-opacity">
                    <Label htmlFor="updatedAt">Updated At :</Label>
                    <Label id="updatedAt">{task.updatedAt?.toString().split("T")[0]}</Label>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="destructive">Delete</Button>
                <Button type="submit">Save changes</Button>
            </div>
        </form>
    )
}
