import type { FilterState } from "./filter-slice";
import type { Task } from "./types";

export const selectFilteredTasks = (tasks: Task[], filters: FilterState) => {
  const { status, search } = filters;

  return tasks.filter((task) => {
    if (status !== "all" && task.status !== status) {
      return false;
    }
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });
};
