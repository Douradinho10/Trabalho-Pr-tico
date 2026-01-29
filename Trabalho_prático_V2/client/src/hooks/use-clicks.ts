import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type CreateClickRequest } from "@shared/routes";

// GET /api/clicks
export function useClicks() {
  return useQuery({
    queryKey: [api.clicks.list.path],
    queryFn: async () => {
      const res = await fetch(api.clicks.list.path);
      if (!res.ok) throw new Error("Failed to fetch history");
      // Validate with schema from routes
      return api.clicks.list.responses[200].parse(await res.json());
    },
    // Refresh frequently to see other users' clicks if needed, 
    // or rely on invalidation after mutation
    staleTime: 10000, 
  });
}

// POST /api/clicks
export function useCreateClick() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateClickRequest) => {
      const res = await fetch(api.clicks.create.path, {
        method: api.clicks.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Invalid request");
        }
        throw new Error("Failed to register click");
      }
      
      return api.clicks.create.responses[201].parse(await res.json());
    },
    onSuccess: (newClick) => {
      // Invalidate history query to show new click immediately
      queryClient.invalidateQueries({ queryKey: [api.clicks.list.path] });
    },
  });
}
