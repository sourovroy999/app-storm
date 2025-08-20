import React from 'react';
import useProductCount from '../../../../../hooks/useProductCount';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import CompactPieChart from '../../../../PieCharts/ProductsPieChart';

const StatisticsPage = () => {
    const axiosSecure=useAxiosSecure()
    const { counts, isGettingCount, isError} = useProductCount()

    // const{users, isLoading, refetch}=useUsers()

    const {data: userCounts={}, isLoading, isRefetchError, refetch}=useQuery(
        {
            queryKey:['users-count'],
            queryFn: async()=>{
                const{data}=await axiosSecure.get('/user-stats')
                return data

            },
            onError:(err)=>{
                    console.log(err);
                    
            }
        }
    )


    console.log(counts);
    // console.log(users);
    console.log(userCounts);
    // const { roles: { moderator, guest, admin }, memberships: { free, premium } } = userCounts;

    
    

    if(isLoading || isGettingCount){
        return <p>Loading queue...</p>
}

    

    return (
        <div>
            
            
              <div className="  gap-2  hidden my-4">
                <p>

            Pending Product :{counts?.pending}
                </p>
                <p>
            Approved Product :{counts.approved}

                </p>

                <p>
            Featured Product :{counts.featured}

                </p>

                <p>
            Rejected Product:{counts.rejected}

                </p>
                moderator:{userCounts.roles.moderator}
                <br />
                admin:{userCounts.roles.moderator}
                <br />
                guest:{userCounts.roles.moderator}
                <br />
               Premium: {userCounts.memberships.premium}
                <br />
                free:{userCounts.memberships.free}


           


            </div>

            <CompactPieChart counts={counts} userCounts={userCounts}/>


            
        </div>
    );
};

export default StatisticsPage;