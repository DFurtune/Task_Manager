import { useTasks } from '@/features/tasks/api'
import { CreateTaskForm } from '@/features/tasks/create-task-form'
import { FiltersPanel } from '@/features/tasks/filters-panel'
import { useAppSelector } from '@/app/hooks'
import { selectFilteredTasks } from '@/features/tasks/selectors'
import { TaskCard } from '@/features/tasks/task-card'
import { TaskCardSkeleton } from '@/features/tasks/task-card-skeleton'
import { EmptyState } from '@/features/tasks/empty-state'

export const TasksPage = () => {
    const { data = [], isLoading, isError } = useTasks()
    const filters = useAppSelector((s) => s.taskFilters)

    if (isLoading) return (
        <div className='space-y-4'>
            {Array.from({ length: 4 }).map((_, i) => (
                <TaskCardSkeleton key={i} />
            ))}
        </div>)

    if (isError) return <div>Error loading tasks</div>

    const filteredTasks = selectFilteredTasks(data, filters)

    if (!data.length) {
        return (
            <div className="space-y-6">
                <CreateTaskForm />

                <EmptyState
                    title='Your task list is empty'
                    description='Start by creating your first task.'
                    actionLabel='Add task'
                    onAction={() => document.querySelector("input")?.focus()}
                />
            </div>
        )
    }

    if (!filteredTasks.length) {
        return (
            <div className="space-y-6">
                <CreateTaskForm />
                <FiltersPanel />

                <EmptyState
                    title="No tasks found"
                    description="Try changing filters or create a new task."
                />
            </div>
        )
    }



    return (
        <div className="space-y-6">
            <CreateTaskForm />
            <FiltersPanel />

            <div className="grid gap-4">
                {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}
