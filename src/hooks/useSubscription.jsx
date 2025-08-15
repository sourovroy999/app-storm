// src/hooks/useSubscription.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useSubscription = () => {
  const { user } = useAuth(); // get user inside the hook
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/subscription');
      return data;
    },
    enabled: !!user, // only fetch when user exists
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};

export default useSubscription;
