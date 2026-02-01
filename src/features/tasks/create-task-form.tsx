import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTask } from "./api"
import { taskSchema, type TaskFormValues } from "./schema"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

export const CreateTaskForm = () => {
    const createTask = useCreateTask()
    const { toast } = useToast()

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            status: 'todo',
            priority: 'medium',
            dueDate: '',
        },
    })

    const onSubmit = (values: TaskFormValues) => {
        createTask.mutate({
            ...values,
            categoryId: 'general',
            tags: [],
            createdAt: new Date().toISOString(),
        },
            {
                onSuccess: () => {
                    toast({
                        title: 'Task created',
                        description: 'New task added',
                    })
                }
            })
        form.reset()
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 max-w-md'
        >
            <Input placeholder="Title" {...form.register('title')} />
            <Textarea placeholder="Description" {...form.register('description')} />
            <Input type="date" {...form.register('dueDate')} />

            <Button type="submit" disabled={createTask.isPending}>
                {createTask.isPending ? 'Creating...' : 'Create task'}
            </Button>
        </form>
    )
}