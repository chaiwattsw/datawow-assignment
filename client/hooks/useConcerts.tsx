import httpClient from "@/utils";
import { useQuery } from "@tanstack/react-query";

interface Concert {
  id: number;
  name: string;
  description: string;
  totalSeats: number;
  createdAt: Date;
  updatedAt: Date;
}

async function fetchAllConcerts(): Promise<Concert[]> {
  const { data } = await httpClient.get("/concerts");

  return data;
}

export const useConcerts = () => {
  return useQuery<Concert[], Error>({
    queryKey: ["concerts"],
    queryFn: () => fetchAllConcerts(),
  });
};
