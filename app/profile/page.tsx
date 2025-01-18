"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Card } from "@/components/ui/card";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useTaskStore } from "@/lib/store";

export default function Profile() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { tasks, setTasks } = useTaskStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          "https://my-json-server.typicode.com/sukritihere/antriksh-labs_jsonserver/tasks"
        );
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError(
          "Unable to connect to the task server. Please ensure the JSON server is running with 'npm run server'"
        );
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks]);

  const tasksInProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Card className="max-w-3xl mx-auto p-6 shadow-lg border">
            <div className="flex flex-col items-center mb-8 p-2">
              <div className="relative mb-4">
                <CgProfile className="w-32 h-32 text-primary" />
                <span className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></span>
              </div>

              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground">
                  Sukriti Singh
                </h1>
                <p className="text-muted-foreground">
                  Frontend Developer | sukritisingh9469@gmail.com
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Name
                    </label>
                    <div className="text-lg text-foreground">Sukriti Singh</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Email
                    </label>
                    <div className="text-lg text-foreground">
                      sukritisingh9469@gmail.com
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Role
                    </label>
                    <div className="text-lg text-foreground">
                      Frontend Developer
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Gender
                    </label>
                    <div className="text-lg text-foreground">Female</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Task Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{tasksInProgress}</div>
                    <div className="text-sm text-muted-foreground">
                      Tasks in Progress
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{completedTasks}</div>
                    <div className="text-sm text-muted-foreground">
                      Completed Tasks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
