import axios from "axios";
import type { Car, CarEntry, CarResponse } from "../types";

export async function getCars(): Promise<CarResponse[]> {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`);
  return response.data._embedded.cars;
}

export async function deleteCar(link: string): Promise<CarResponse> {
  const response = await axios.delete(link);
  return response.data;
}

export async function addCar(car: Car): Promise<CarResponse> {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
}

export async function updateCar(carEntry: CarEntry): Promise<CarResponse> {
  const response = await axios.put(carEntry.url, carEntry.car, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}
