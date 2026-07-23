import type { HealthTodoResponse } from "@/types/health";

export async function fetchHealthTodo(): Promise<HealthTodoResponse> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Health check API request failed with status ${response.status}`);
  }

  return (await response.json()) as HealthTodoResponse;
}
