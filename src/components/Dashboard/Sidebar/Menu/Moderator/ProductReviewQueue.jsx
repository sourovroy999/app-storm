import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import MySingleProduct from "../Guest/MySingleProduct";
import PendingSingleProduct from "./PendingSingleProduct";


const ProductReviewQueue = () => {
    const axiosSecure=useAxiosSecure()

    const{data: pendingProducts=[], isLoading, refetch}=useQuery({
        queryKey:['pending-products'],

        queryFn: async()=>{
            const {data}= await axiosSecure.get(`/products-for-reviews`)
       return data
            },
         onError:(err)=>{
            console.log(err);
            
         }

    })

    if(isLoading){
        return <p>Loading queue...</p>
}

console.log(pendingProducts);

  



    return (
        <div>
            <p className="text-center">

            ProductReviewQueue :{pendingProducts.length}
            </p>
            <div className="">
            <div className="text-3xl font-bold my-4 text-center">
                Pending Products for Review
            </div>

            <div>

                <ul className="list bg-base-100 rounded-box shadow-md ">

                   

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
        pendingProducts.map(product=>  <PendingSingleProduct key={product._id} product={product} refetch={refetch}/>)
      }

    
     
    </tbody>
    
  </table>
</div>

                {/* table end */}


                </ul>

            </div>




        </div>


        </div>
    );
};

export default ProductReviewQueue