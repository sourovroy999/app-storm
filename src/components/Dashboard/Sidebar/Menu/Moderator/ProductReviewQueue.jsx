import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import PendingSingleProduct from "./PendingSingleProduct";
import useProductCount from "../../../../../hooks/useProductCount";
import LoadingSpinner from "../../../../Spinner/LoadingSpinner";

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

    const { counts, isGettingCount, isError} = useProductCount()


  //   const { data: counts , isLoading:isGettingCount} = useQuery({
  // queryKey: ['productStatusCounts'],
  // queryFn: async () => {
  //   const res = await axiosSecure.get('/product-status-counts');
  //   return res.data;
  // }
  //  });


    if(isLoading || isGettingCount){
        return <LoadingSpinner/>
}

console.log(pendingProducts);
console.log(counts);


  



    return (
        <div className="max-w-4xl mx-auto  ">
          
            <div className="">
            <div className="text-3xl font-bold my-4 text-center">
                Pending Products for Review
            </div>

              <div className=" hidden flex-col gap-2  my-4">
                <p>

            Pending Product :{counts.pending}
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