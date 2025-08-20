
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
     const axiosSecure=useAxiosSecure()

    const{data:users=[], isLoading, refetch}=useQuery({
        queryKey:['all-users'],
        queryFn:async()=>{
            const{data}=await axiosSecure.get('/users')
            // refetch()
            return data
        },
        onError:(err)=>{
            console.log(err);
            
        }

    })
    return {users, isLoading, refetch}
};

export default useUsers;