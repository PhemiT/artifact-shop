import React from "react";
import axios,{ AxiosError } from "axios";

const searchItems = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    try {
      const response = await axios.post('http://localhost:8000/api/search-items', { query });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response?.status === 400) {
          console.log('No items found');
        } else {
          console.log('Unexpected error', error);
        }
      } else {
        console.log('Unexpected error', err);
      }
    }
  }

export default searchItems;