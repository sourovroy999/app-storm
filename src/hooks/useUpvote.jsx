import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const useUpvote = (refetch) => {

    const axiosSecure=useAxiosSecure()

    const {user}=useAuth()

    const {mutateAsync:upvoteProduct, isPending:isUpvoting}=useMutation({

mutationFn: async(productId)=>{
  console.log(productId);
  
  const {data}=await axiosSecure.patch(`upvote-product/${productId}`, {
    user_email:user.email,
    user_name: user.displayName
  });
  return data

},

onSuccess: ()=>{
  refetch()
  toast.success('upvoted successfully')

},
    onError: (error) => {
      console.error('Upvote error:', error);
      toast.error(error.response?.data?.message || 'Failed to upvote');
    }

  })



    return {upvoteProduct, isUpvoting}
};

export default useUpvote;