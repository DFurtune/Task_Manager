import { apiClient } from "@/shared/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task } from "./types";

const TASKS_KEY = ["tasks"];
const DELETE_DELAY = 5000;

export const useTasks = () => {
  return useQuery({
    queryKey: TASKS_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Task[]>("/tasks");
      return data;
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Omit<Task, "id">) => {
      const { data } = await apiClient.post<Task>("/tasks", task);
      return data;
    },

    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY });

      const previousTasks = queryClient.getQueryData<Task[]>(TASKS_KEY);

      queryClient.setQueryData<Task[]>(TASKS_KEY, (old = []) => [
        ...old,
        { ...newTask, id: crypto.randomUUID() },
      ]);

      return { previousTasks };
    },

    onError: (_err, _newTask, context) => {
      queryClient.setQueryData(TASKS_KEY, context?.previousTasks);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Task) => {
      const { data } = await apiClient.put<Task>(`/tasks/${task.id}`, task);
      return data;
    },
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY });

      const previousTasks = queryClient.getQueryData<Task[]>(TASKS_KEY);

      queryClient.setQueryData<Task[]>(TASKS_KEY, (old = []) =>
        old.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
        ),
      );

      return { previousTasks };
    },

    onError: (_err, _updatedTask, context) => {
      queryClient.setQueryData(TASKS_KEY, context?.previousTasks);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const timers = new Map<string, ReturnType<typeof setTimeout>>();

  return {
    deleteTask(task: Task) {
      if (!task?.id) {
        return () => {};
      }

      queryClient.setQueryData<Task[]>(TASKS_KEY, (old = []) =>
        old.filter((t): t is Task => Boolean(t) && t.id !== task.id),
      );

      const timer = setTimeout(async () => {
        await apiClient.delete(`/tasks/${task.id}`);
        queryClient.invalidateQueries({ queryKey: TASKS_KEY });
        timers.delete(task.id);
      }, DELETE_DELAY);

      timers.set(task.id, timer);

      return () => {
        const timer = timers.get(task.id);
        if (!timer) return;

        clearTimeout(timer);
        timers.delete(task.id);

        queryClient.setQueryData<Task[]>(TASKS_KEY, (old = []) => {
          if (old.some((t) => t?.id === task.id)) return old;
          return [task, ...old.filter(Boolean)];
        });
      };
    },
  };
};
