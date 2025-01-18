import TaskDetailClient from "./task-detail-client";

// This function tells Next.js which routes to pre-render
export async function generateStaticParams() {
  const tasks = await fetch("http://localhost:3001/tasks").then((res) =>
    res.json()
  );
  return tasks.map((task: any) => ({
    id: task.id.toString(),
  }));
}

export default function TaskDetailPage() {
  return <TaskDetailClient />;
}
