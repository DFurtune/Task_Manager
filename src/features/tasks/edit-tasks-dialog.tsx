import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import type { Task } from "./types"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { EditTaskForm } from './edit-task-form'
import { useState } from "react"

interface Props {
    task: Task
}

export const EditTaskDialog = ({ task }: Props) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Edit task">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit task</DialogTitle>
                </DialogHeader>
                <DialogDescription>Please update task</DialogDescription>

                <EditTaskForm task={task} onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}