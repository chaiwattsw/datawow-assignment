import React, { useState } from "react";
import { IconUser } from "./Icons";
import IconSave from "./Icons/Save";
import { useCreateConcert } from "@/hooks/useCreateConcert";

interface CreateConcertFormProps {
  onSuccess: () => void;
}

const CreateConcertForm = ({ onSuccess }: CreateConcertFormProps) => {
  const [concertName, setConcertName] = useState("");
  const [totalSeats, setTotalSeats] = useState("500");
  const [description, setDescription] = useState("");
  const createConcertMutation = useCreateConcert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newConcert = {
      name: concertName,
      description,
      totalSeats: parseInt(totalSeats, 10),
    };
    await createConcertMutation.mutateAsync(newConcert);
    onSuccess();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Create</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="concertName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Concert Name
            </label>
            <input
              type="text"
              id="concertName"
              value={concertName}
              onChange={(e) => setConcertName(e.target.value)}
              placeholder="Please input concert name"
              className="w-full px-3 py-2 border text-black  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="totalSeats"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Total of seat
            </label>
            <div className="relative">
              <input
                type="number"
                id="totalSeats"
                value={totalSeats}
                onChange={(e) => setTotalSeats(e.target.value)}
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
              <IconUser />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please input description"
            rows={4}
            className="w-full px-3 py-2 border text-black  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 gap-2 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          >
            <IconSave />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateConcertForm;
