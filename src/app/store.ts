import { configureStore } from '@reduxjs/toolkit'
import { filtersReducer } from '@/features/tasks/filter-slice'

export const store = configureStore({
    reducer: {
        taskFilters: filtersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch