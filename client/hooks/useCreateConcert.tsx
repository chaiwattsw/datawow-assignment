import httpClient from "@/utils";
import { useMutation } from "@tanstack/react-query";

interface CreateConcertDto {
  name: string;
  description: string;
  totalSeats: number;
}

interface CreateConcertResponse {
  id: number;
  name: string;
  description: string;
  totalSeats: number;
}

const createConcert = async (
  concertData: CreateConcertDto
): Promise<CreateConcertResponse> => {
  const { data } = await httpClient.post<CreateConcertResponse>(
    "/concerts",
    concertData
  );
  return data;
};

export const useCreateConcert = () => {
  return useMutation<CreateConcertResponse, Error, CreateConcertDto>({
    mutationFn: async (newConcert) => createConcert(newConcert),
    mutationKey: ["create-concert"],
  });
};
