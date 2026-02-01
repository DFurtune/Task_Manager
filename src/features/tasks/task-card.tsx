import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EditTaskDialog } from "./edit-tasks-dialog";
import { DeleteTaskDialog } from "./delete-task-dialog";
import type { Task } from "./types";

interface Props {
    task: Task
}

export const TaskCard = ({ task }: Props) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{task.title}</CardTitle>

                <div className="flex items-center gap-2">
                    <EditTaskDialog task={task} />
                    <DeleteTaskDialog taskId={task.id} />
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-muted-foreground">{task.description || 'No descriprion'}</p>
            </CardContent>
        </Card>
    )
}