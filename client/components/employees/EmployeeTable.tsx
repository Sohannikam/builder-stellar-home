import { Employee } from "@shared/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function EmployeeTable({ employees, onEdit, onDelete }: {
  employees: Employee[];
  onEdit: (emp: Employee) => void;
  onDelete: (emp: Employee) => void;
}) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Salary</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-medium">{e.name}</TableCell>
              <TableCell className="text-muted-foreground">{e.email}</TableCell>
              <TableCell><Badge variant="secondary">{e.role}</Badge></TableCell>
              <TableCell>{e.department}</TableCell>
              <TableCell className="text-right">${" "+e.salary.toLocaleString()}</TableCell>
              <TableCell>{new Date(e.dateOfJoining).toLocaleDateString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(e)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(e)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          {employees.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-10">No employees found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
