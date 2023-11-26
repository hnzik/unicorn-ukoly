import { useQuery } from "react-query";
import { api } from "../Utils/api";
import { List } from "../Types/List";

export const useGetListById = (id: string) => {
    return useQuery(['list', id], async () => {
      const { data } = await api.get(`lists/${id}`);
      return data as List;
    });
  };