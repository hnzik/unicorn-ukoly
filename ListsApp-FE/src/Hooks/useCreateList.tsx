import { useMutation, useQueryClient } from "react-query";
import { api } from "../Utils/api";
import { CreateList, List } from "../Types/List";

export const useCreateList = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      async (newList : CreateList) => {
        const { data } = await api.post('lists', newList);
        return data as List;
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries('lists');
        },
      }
    );
  };