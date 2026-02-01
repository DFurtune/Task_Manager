import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setStatus } from "@/features/tasks/filter-slice";


export const Test = () => {
    const status = useAppSelector((s) => s.taskFilters.status)
    const dispatch = useAppDispatch()
    
    dispatch(setStatus('done'))
    console.log(status);
}