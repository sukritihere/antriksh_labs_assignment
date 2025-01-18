"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/lib/store";
import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
export default function Tasks() {
  const { tasks } = useTaskStore();
  const params = useParams();
  tasks;
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 ">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-6 w-6" />
                Tasks Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="pt-6">
                      <Link
                        className="font-semibold mb-2"
                        href={`/tasks/${task.id}`}
                      >
                        {task.title}
                      </Link>
                      <p className="text-muted-foreground text-sm">
                        {task.description}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            task.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
