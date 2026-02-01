import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TaskStatus = "all" | "todo" | "in_progress" | "done";

export interface FilterState {
  status: TaskStatus;
  search: string;
}

const initialState: FilterState = {
  status: "all",
  search: "",
};

const filterSlice = createSlice({
  name: "taskFilters",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<TaskStatus>) {
      state.status = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setStatus, setSearch, resetFilters } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
