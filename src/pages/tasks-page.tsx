import { useTasks } from '@/features/tasks/api'
import { CreateTaskForm } from '@/features/tasks/create-task-form'
import { FiltersPanel } from '@/features/tasks/filters-panel'
import { useAppSelector } from '@/app/hooks'
import { selectFilteredTasks } from '@/features/tasks/selectors'
import { TaskCard } from '@/features/tasks/task-card'
import { TaskCardSkeleton } from '@/features/tasks/task-card-skeleton'

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
