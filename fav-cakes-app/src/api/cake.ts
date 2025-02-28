import axios from 'axios';
import { Cake } from '../types/cake'

const API_BASE_URL = 'http://localhost:3002/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getCakes = async (): Promise<Cake[]> => {
  const response = await apiClient.get<Cake[]>('/cakes');
  return response.data;
};

export const getCakeById = async (id: number): Promise<Cake> => {
  const response = await apiClient.get<Cake>(`/cakes/${id}`);
  return response.data;
};

export const addCake = async (cakeData: Omit<Cake, 'id'>) => {
  console.log('cakeData', cakeData);
  
  const response = await apiClient.post<Cake>('/cakes', cakeData);
  console.log('response', response);
  
  return response;
};

// export const updateCake = async (id: number, cakeData: Partial<Cake>): Promise<Cake> => {
//   const response = await apiClient.put<Cake>(`/cakes/${id}`, cakeData);
//   return response.data;
// };

export const deleteCake = async (cakeId: number): Promise<void> => {
  await apiClient.delete(`/cakes/${cakeId}`);
};
