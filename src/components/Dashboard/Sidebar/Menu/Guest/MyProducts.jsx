
//here all the products will be seen
import { useMutation, useQuery } from '@tanstack/react-query'
import useAuth from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import MySingleProduct from './MySingleProduct';
import toast from 'react-hot-toast';

const Products = () => {

    const{user}=useAuth()

    const axiosSecure=useAxiosSecure()

    const{data: products=[], refetch, isLoading }=useQuery({
        queryKey:['my-products', user?.email],
        queryFn:async()=>{
            if(!user?.email){
                return []
            }
            const{data}=await axiosSecure.get(`/my-products`)
            
            return data
        },
        enabled:!!user?.email,
        onError:(err)=>{
            console.log(err);
            
        }
        
    })



  
    

    if (isLoading) return <p>Loading...</p>;

    console.log(products);


    return (
        <div className="">
            <div className="text-3xl font-bold my-4 text-center">
                Your Products
            </div>

            <div>

                <ul className="list bg-base-100 rounded-box shadow-md ">

                    {/* <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most recent product of this week</li> */}

                {/* table start */}

                <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
       
        <th>Product Name</th>
        <th>Tagline</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        products.map(product=>  <MySingleProduct key={product._id} product={product} refetch={refetch}/>)
      }

    
     
    </tbody>
    
  </table>
</div>

                {/* table end */}


                </ul>

            </div>




        </div>
    );
};

export default Products;