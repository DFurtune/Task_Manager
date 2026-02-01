import { Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTask } from "./api";
import { EditTaskDialog } from "./edit-tasks-dialog";
import type { Task } from "./types";

interface Props {
    task: Task
}

export const TaskCard = ({ task }: Props) => {
    const deleteTask = useDeleteTask()

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{task.title}</CardTitle>

                <div className="flex gap-1">
                    <EditTaskDialog task={task} />

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Delete task">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete task?</DialogTitle>
                            </DialogHeader>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive" onClick={() => deleteTask.mutate(task.id)}>Delete</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-muted-foreground">{task.description || 'No descriprion'}</p>
            </CardContent>
        </Card>
    )
}