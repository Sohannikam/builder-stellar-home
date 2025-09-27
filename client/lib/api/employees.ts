import {
  Employee,
  EmployeeBase,
  EmployeeResponse,
  ListEmployeesResponse,
} from "@shared/api";

const BASE = "/api/employees";

export async function fetchEmployees(): Promise<Employee[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch employees");
  const json = (await res.json()) as ListEmployeesResponse;
  return json.data;
}

export async function createEmployeeApi(
  payload: EmployeeBase,
): Promise<Employee> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error((await res.json()).error ?? "Failed to create employee");
  const json = (await res.json()) as EmployeeResponse;
  return json.data;
}

export async function updateEmployeeApi(
  id: string,
  payload: EmployeeBase,
): Promise<Employee> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error((await res.json()).error ?? "Failed to update employee");
  const json = (await res.json()) as EmployeeResponse;
  return json.data;
}

export async function deleteEmployeeApi(id: string): Promise<Employee> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok)
    throw new Error((await res.json()).error ?? "Failed to delete employee");
  const json = (await res.json()) as EmployeeResponse;
  return json.data;
}
