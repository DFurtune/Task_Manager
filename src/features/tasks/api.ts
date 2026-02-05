import { apiClient } from "@/shared/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task } from "./types";
import { useToast } from "@/hooks/use-toast";

const TASKS_KEY = ["tasks"];

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const {toast} = useToast()

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/tasks/${id}`);
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY });

      const previousTasks = queryClient.getQueryData<Task[]>(TASKS_KEY);

      queryClient.setQueryData<Task[]>(TASKS_KEY, (old = []) =>
        old.filter((task) => task.id !== id),
      );

      return { previousTasks };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(TASKS_KEY, context?.previousTasks);

      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    },

    onSuccess: () => {
      toast({
        title: "Task deleted",
        description: "The task was successfully removed.",
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    },
  });
};
