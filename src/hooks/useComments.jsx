
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useComments = (productId) => {
    const axiosSecure=useAxiosSecure();

    return useQuery({
        queryKey:['comments', productId],

        queryFn: async()=>{
            const {data}=await axiosSecure.get(`/comments/${productId}`)
            return data
        },

        enabled: !!productId
    })
};

export default useComments;