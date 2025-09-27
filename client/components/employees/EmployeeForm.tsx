import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmployeeBase } from "@shared/api";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  salary: z.coerce.number().nonnegative("Invalid salary"),
  dateOfJoining: z.string().min(1, "Joining date is required"),
});

export type EmployeeFormValues = z.infer<typeof schema>;

export default function EmployeeForm({
  initial,
  onSubmit,
  submitting,
}: {
  initial?: Partial<EmployeeBase>;
  onSubmit: (values: EmployeeFormValues) => void | Promise<void>;
  submitting?: boolean;
}) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name ?? "",
      email: initial?.email ?? "",
      role: initial?.role ?? "",
      department: initial?.department ?? "",
      salary: (initial?.salary as number | undefined) ?? 0,
      dateOfJoining:
        initial?.dateOfJoining?.slice(0, 10) ??
        new Date().toISOString().slice(0, 10),
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="text-destructive text-sm mt-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="text-destructive text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" {...form.register("role")} />
          {form.formState.errors.role && (
            <p className="text-destructive text-sm mt-1">
              {form.formState.errors.role.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Input id="department" {...form.register("department")} />
          {form.formState.errors.department && (
            <p className="text-destructive text-sm mt-1">
              {form.formState.errors.department.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="salary">Salary (USD)</Label>
          <Input
            id="salary"
            type="number"
            step="0.01"
            {...form.register("salary", { valueAsNumber: true })}
          />
          {form.formState.errors.salary && (
            <p className="text-destructive text-sm mt-1">
              {form.formState.errors.salary.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="dateOfJoining">Date of Joining</Label>
          <Input
            id="dateOfJoining"
            type="date"
            {...form.register("dateOfJoining")}
          />
          {form.formState.errors.dateOfJoining && (
            <p className="text-destructive text-sm mt-1">
              {form.formState.errors.dateOfJoining.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
