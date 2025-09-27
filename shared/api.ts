/**
 * Shared types for Employee Management
 */

export interface DemoResponse {
  message: string;
}

export type EmployeeBase = {
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  dateOfJoining: string; // ISO date string
};

export type Employee = EmployeeBase & { id: string };

export interface ListEmployeesResponse {
  data: Employee[];
}

export interface EmployeeResponse {
  data: Employee;
}

export interface ApiError {
  error: string;
}
