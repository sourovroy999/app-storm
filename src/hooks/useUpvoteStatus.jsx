import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUpvoteStatus = (productId) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  return useQuery({
    queryKey: ['upvoteStatus', productId, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/upvotes-collection/${productId}`, {
        params: { user_email: user?.email }
      });
      

      return data; // { totalUpvotes, hasUpvoted }
    },
    enabled: !!productId && !!user?.email,
    staleTime: 0,
    cacheTime: 5 * 60 * 1000,
  });
};

export default useUpvoteStatus;
