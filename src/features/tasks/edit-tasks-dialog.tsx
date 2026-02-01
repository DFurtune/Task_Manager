import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Task } from "./types"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { EditTaskForm } from './edit-task-form'

interface Props {
    task: Task
}

export const EditTaskDialog = ({ task }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Edit task">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit task</DialogTitle>
                </DialogHeader>

                <EditTaskForm task={task} onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}