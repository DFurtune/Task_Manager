import type { Task } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useUpdateTask } from "./api";
import { Input } from "@/components/ui/input";

const schema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
    task: Task
    onSuccess?: () => void
}

export const EditTaskForm = ({ task, onSuccess }: Props) => {
    const updateTask = useUpdateTask()

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: task.title,
            description: task.description,
        },
    })

    const onSubmit = (values: FormValues) => {
        updateTask.mutate({
            ...task,
            ...values,
        },
            {
                onSuccess: () => {
                    form.reset(values)
                    onSuccess?.()
                }
            })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input {...form.register('title')} placeholder="Title" />
            <Input {...form.register('description')} placeholder="Description" />

            <Button type="submit" className="w-full">Save</Button>
        </form>
    )
}