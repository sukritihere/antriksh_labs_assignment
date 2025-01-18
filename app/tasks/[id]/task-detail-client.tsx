"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Task } from "@/types";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TaskDetailClient() {
  const params = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:3001/tasks/${params.id}`);
        if (!res.ok) throw new Error("Task not found");
        const data = await res.json();
        setTask(data);
        setError(null);
      } catch (err) {
        setError("Failed to load task details");
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [params.id]);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-24" />
              </CardContent>
            </Card>
          ) : task ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl lg:text-3xl">
                  {task.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-muted-foreground text-sm md:text-base">
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    }`}
                  >
                    {task.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Task not found
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
