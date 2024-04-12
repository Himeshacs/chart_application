import axios, { AxiosResponse } from 'axios';
import { Product } from '../types/types';

const BASE_URL: string = 'https://dummyjson.com';

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const { data }: AxiosResponse<any> = await axios.get(`${BASE_URL}/products/category/${category}`);
    
    if (data && data.products && Array.isArray(data.products)) {
      return data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        price: product.price
      }));
    } else {
      console.error('Invalid data format:', data);
      return [];
    }
  } catch (error) {
    const err: Error = error as Error;
    console.error('Error fetching products:', err.message);
    return [];
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const { data }: AxiosResponse<string[]> = await axios.get(`${BASE_URL}/products/categories`);
    return data;
  } catch (error) {
    const err: Error = error as Error;
    console.error('Error fetching categories:', err.message);
    return [];
  }
};
