import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useProductCount = () => {
    const axiosSecure=useAxiosSecure()
    const{user}=useAuth()

       const { data: counts , refetch, isLoading:isGettingCount, isError} = useQuery({
  queryKey: ['productStatusCounts'],
  queryFn: async () => {
    const res = await axiosSecure.get('/product-status-counts');
    return res.data;
  },
      enabled:!!user?.email,
        onError: (err)=>{
       console.error('Failed to fetch products:', err);

        }

   });


    return{counts, refetch, isGettingCount, isError}
};

export default useProductCount;