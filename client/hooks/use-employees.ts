import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEmployeeApi, deleteEmployeeApi, fetchEmployees, updateEmployeeApi } from "@/lib/api/employees";
import { Employee, EmployeeBase } from "@shared/api";

export function useEmployees() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["employees"], queryFn: fetchEmployees });

  const create = useMutation({
    mutationFn: (payload: EmployeeBase) => createEmployeeApi(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: EmployeeBase }) => updateEmployeeApi(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteEmployeeApi(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  return { query, create, update, remove };
}
