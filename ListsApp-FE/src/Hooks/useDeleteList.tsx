import { useMutation, useQueryClient } from "react-query";
import { api } from "../Utils/api";

export const useDeleteList = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      async (id: string) => {
        await api.delete(`lists/${id}`);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch lists to reflect the deletion
          queryClient.invalidateQueries('lists');
        },
        onError: (error) => {
            console.error(error);
        }
      }
    );
  };