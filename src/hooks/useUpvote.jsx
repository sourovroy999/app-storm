import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpvote = (refetch, productId = null) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { mutateAsync: upvoteProduct, isPending: isUpvoting } = useMutation({
        mutationFn: async (productId) => {
            console.log(productId);
            
            const { data } = await axiosSecure.patch(`upvote-product/${productId}`, {
                user_email: user.email,
                user_name: user.displayName
            });
            return data;
        },

        onSuccess: (data, variables) => {
            // Call the original refetch
            if (refetch) refetch();
            
         
            
            queryClient.invalidateQueries({
                queryKey: ['totalUpvotes', variables]
            });
            
            // Optionally invalidate all upvote-related queries
            queryClient.invalidateQueries({
                queryKey: ['upvoteStatus']
            });
 // Only show toast if not silent
            if (!data.silent) {
                toast.success(data.message || 'Action successful');
            }
        },

        onError: (error) => {
            console.error('Upvote error:', error);
            toast.error(error.response?.data?.message || 'Failed to upvote');
        }
    });

    return { upvoteProduct, isUpvoting };
};

export default useUpvote;