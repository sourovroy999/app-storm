import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMyProducts = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();

    const {data=[], refetch, isLoading, isError}=useQuery({
        queryKey:['my-products', user?.email],
        queryFn: async()=>{
         if (!user?.email) return [];
      const { data } = await axiosSecure.get('/my-products');
      return data;
        },

        enabled:!!user?.email,
        onError: (err)=>{
       console.error('Failed to fetch products:', err);

        }

    })
    console.log(data);
    
    return {products:data, refetch, isLoading, isError}
};

export default useMyProducts;