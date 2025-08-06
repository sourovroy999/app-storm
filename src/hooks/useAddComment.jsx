import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';

const useAddComment = () => {
    
    const{user}=useAuth()

    const userName=user?.displayName;
    const userPhoto=user?.photoURL

    const axiosSecure=useAxiosSecure();
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn: async({productId, commentText})=>{
            const {data}=await axiosSecure.post('/comments', {productId, commentText, userName, userPhoto});
            return data
        },
        onSuccess:(_, variables)=>{
            queryClient.invalidateQueries(['comments', variables.productId])
        }
    })
};

export default useAddComment;