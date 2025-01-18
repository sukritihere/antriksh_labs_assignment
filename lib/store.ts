import { create } from "zustand";
import { Task } from "@/types";

interface TaskStore {
  tasks: Task[];
  updateTaskStatus: (id: number, status: string) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  updateTaskStatus: async (id: number, status: string) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    set({ tasks: updatedTasks });

    try {
      await fetch(
        `https://my-json-server.typicode.com/sukritihere/antriksh-labs_jsonserver/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
    } catch (error) {
      console.error("Failed to update task status on server:", error);
    }
  },
}));
