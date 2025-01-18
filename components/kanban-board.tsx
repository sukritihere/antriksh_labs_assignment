"use client";

import { useDrop } from "react-dnd";
import { Task } from "@/types";
import TaskCard from "./task-card";
import { useTaskStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ColumnProps {
  title: string;
  tasks: Task[];
  status: string;
}

function Column({ title, tasks, status }: ColumnProps) {
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: number }) => {
      updateTaskStatus(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`flex-1 p-4 ${isOver ? "bg-accent/50" : ""}`}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <Column
        title="In Progress"
        tasks={inProgressTasks}
        status="In Progress"
      />
      <Column title="Completed" tasks={completedTasks} status="Completed" />
    </div>
  );
}
