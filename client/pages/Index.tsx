import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EmployeeTable from "@/components/employees/EmployeeTable";
import EmployeeForm, { EmployeeFormValues } from "@/components/employees/EmployeeForm";
import { useEmployees } from "@/hooks/use-employees";
import { Employee } from "@shared/api";
import { toast } from "sonner";

export default function Index() {
  const { query, create, update, remove } = useEmployees();
  const [search, setSearch] = useState("");
  const [editEmp, setEditEmp] = useState<Employee | null>(null);
  const [open, setOpen] = useState(false);

  const employees = query.data ?? [];
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter((e) =>
      [e.name, e.email, e.role, e.department].some((v) => v.toLowerCase().includes(q)),
    );
  }, [search, employees]);

  const onCreate = async (values: EmployeeFormValues) => {
    try {
      await create.mutateAsync({ ...values, salary: Number(values.salary) });
      toast.success("Employee created");
      setOpen(false);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to create employee");
    }
  };

  const onUpdate = async (values: EmployeeFormValues) => {
    if (!editEmp) return;
    try {
      await update.mutateAsync({ id: editEmp.id, payload: { ...values, salary: Number(values.salary) } });
      toast.success("Employee updated");
      setEditEmp(null);
      setOpen(false);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to update employee");
    }
  };

  const onDelete = async (emp: Employee) => {
    try {
      await remove.mutateAsync(emp.id);
      toast.success("Employee deleted");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to delete employee");
    }
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Employee Management</h1>
          <p className="text-muted-foreground">Create, read, update, and delete employee records.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Input
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-72"
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="whitespace-nowrap">Add Employee</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>{editEmp ? "Edit Employee" : "Add Employee"}</DialogTitle>
              </DialogHeader>
              <EmployeeForm
                initial={editEmp ?? undefined}
                onSubmit={editEmp ? onUpdate : onCreate}
                submitting={create.isPending || update.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {query.isLoading ? (
        <div className="h-48 grid place-items-center text-muted-foreground">Loading employees...</div>
      ) : query.isError ? (
        <div className="h-48 grid place-items-center text-destructive">Failed to load employees</div>
      ) : (
        <EmployeeTable
          employees={filtered}
          onEdit={(emp) => {
            setEditEmp(emp);
            setOpen(true);
          }}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
