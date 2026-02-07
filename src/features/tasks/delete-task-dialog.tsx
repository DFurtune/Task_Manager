import { useState } from "react"
import type { Task } from "./types"
import { useDeleteTask } from "./api"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Props {
    task: Task
}

export const DeleteTaskDialog = ({ task }: Props) => {
    const [open, setOpen] = useState(false)
    const { deleteTask } = useDeleteTask()
    const { toast } = useToast()

    const handleDelete = () => {        
        if (!task?.id) return

        const undo = deleteTask(task)

        toast({
            title: "Task deleted",
            description: "You can undo this action.",
            action: (
                <Button variant="outline" size="sm" onClick={undo}>
                    Undo
                </Button>
            )
        })

        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='ghost' size='icon' aria-label="Delete task">
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete task?</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">This action cannot be undone</p>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

