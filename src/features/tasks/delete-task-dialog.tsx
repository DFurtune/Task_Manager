import { useState } from "react"
import { useDeleteTask } from "./api"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Props {
    taskId: string
}

export const DeleteTaskDialog = ({ taskId }: Props) => {
    const [open, setOpen] = useState(false)
    const deleteTask = useDeleteTask()

    const handleDelete = () => {
        deleteTask.mutate(taskId, {
            onSuccess: () => setOpen(false)
        })
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
                    <Button variant='outline' onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant='destructive' onClick={handleDelete} disabled={deleteTask.isPending}>{deleteTask.isPending ? "Deleting..." : 'Delete'}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}