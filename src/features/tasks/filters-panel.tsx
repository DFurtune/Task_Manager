import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setSearch, setStatus } from "./filter-slice"

export const FiltersPanel = () => {
    const dispatch = useAppDispatch()
    const { status, search } = useAppSelector((s) => s.taskFilters)

    return (
        <div className="flex gap-4">
            <Input placeholder="Search tasks..." value={search} onChange={(e) => dispatch(setSearch(e.target.value))} />
            <Button variant={status === 'all' ? 'default' : 'outline'} onClick={() => dispatch(setStatus('all'))}>All</Button>
            <Button variant={status === 'todo' ? 'default' : 'outline'} onClick={() => dispatch(setStatus('todo'))}>Todo</Button>
            <Button variant={status === 'in_progress' ? 'default' : 'outline'} onClick={() => dispatch(setStatus('in_progress'))}>In Progress</Button>
            <Button variant={status === 'done' ? 'default' : 'outline'} onClick={() => dispatch(setStatus('done'))}>Done</Button>
        </div>
    )
}