import { RequestHandler } from "express";
import { Employee, EmployeeBase } from "@shared/api";
import { z } from "zod";
import { randomUUID } from "crypto";

const employeeSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.string().min(1),
  department: z.string().min(1),
  salary: z.number().nonnegative(),
  dateOfJoining: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
    message: "Invalid date format",
  }),
});

let employees: Employee[] = [
  {
    id: randomUUID(),
    name: "Ava Johnson",
    email: "ava.johnson@example.com",
    role: "Frontend Engineer",
    department: "Engineering",
    salary: 98000,
    dateOfJoining: new Date("2022-04-12").toISOString(),
  },
  {
    id: randomUUID(),
    name: "Liam Chen",
    email: "liam.chen@example.com",
    role: "Product Manager",
    department: "Product",
    salary: 112000,
    dateOfJoining: new Date("2021-09-01").toISOString(),
  },
  {
    id: randomUUID(),
    name: "Mia Patel",
    email: "mia.patel@example.com",
    role: "UX Designer",
    department: "Design",
    salary: 90000,
    dateOfJoining: new Date("2023-02-20").toISOString(),
  },
];

export const listEmployees: RequestHandler = (_req, res) => {
  res.json({ data: employees });
};

export const getEmployee: RequestHandler = (req, res) => {
  const { id } = req.params;
  const emp = employees.find((e) => e.id === id);
  if (!emp) return res.status(404).json({ error: "Employee not found" });
  res.json({ data: emp });
};

export const createEmployee: RequestHandler = (req, res) => {
  const parse = employeeSchema.safeParse(req.body as EmployeeBase);
  if (!parse.success) {
    return res
      .status(400)
      .json({ error: parse.error.flatten().formErrors.join(", ") });
  }
  const emp: Employee = { id: randomUUID(), ...parse.data };
  employees.unshift(emp);
  res.status(201).json({ data: emp });
};

export const updateEmployee: RequestHandler = (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Employee not found" });

  const parse = employeeSchema.safeParse(req.body as EmployeeBase);
  if (!parse.success) {
    return res
      .status(400)
      .json({ error: parse.error.flatten().formErrors.join(", ") });
  }

  employees[index] = { id, ...parse.data };
  res.json({ data: employees[index] });
};

export const deleteEmployee: RequestHandler = (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Employee not found" });
  const [removed] = employees.splice(index, 1);
  res.json({ data: removed });
};
