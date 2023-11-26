import { useMutation, useQueryClient } from "react-query";
import { api } from "../Utils/api";
import { List } from "../Types/List";

export const useUpdateList = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      async ({ id, ...updateData }: List) => {
        const { data } = await api.patch(`lists/${id}`, updateData);
        return data;
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries('lists');
        },
      }
    );
  }