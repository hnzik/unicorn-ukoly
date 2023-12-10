import { useQuery } from "react-query";
import { api } from "../Utils/api";
import { List } from "../Types/List";

export const useGetAllLists = () => {
    return useQuery('lists', async () => {
      const { data } = await api.get('lists');
      return data as List[];
    });
  };
