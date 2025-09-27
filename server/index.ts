import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./routes/employees";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Employees CRUD API
  app.get("/api/employees", listEmployees);
  app.get("/api/employees/:id", getEmployee);
  app.post("/api/employees", createEmployee);
  app.put("/api/employees/:id", updateEmployee);
  app.delete("/api/employees/:id", deleteEmployee);

  return app;
}
