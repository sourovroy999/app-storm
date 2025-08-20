import { useQuery } from "@tanstack/react-query";


import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import ReportedSingleProduct from "./ReportedSingleProduct";
import LoadingSpinner from "../../../../Spinner/LoadingSpinner";


const ReportedContent = () => {
    const axiosSecure=useAxiosSecure()

    const{data: reportedProducts=[], isLoading, refetch}=useQuery({
        queryKey:['reported-products'],

        queryFn: async()=>{
            const {data}= await axiosSecure.get(`/product/reports`)
       return data
            },
         onError:(err)=>{
            console.log(err);
            
         }

    })

    if(isLoading){
        return <LoadingSpinner/>
}

console.log(reportedProducts);








    return (
         <div className="max-w-4xl mx-auto  ">
            <p className="text-center">

         
            </p>
            <div className="">
            <div className="text-3xl font-bold my-4 text-center">
               Reported Contents
            </div>

            <div>

                <ul className="list bg-base-100 rounded-box shadow-md ">

                   

                <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
       
        <th>Product Name</th>
        <th>Product Details</th>
        <th>No Of reports</th>
        <th>Report Details</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {/* {
        pendingProducts.map(product=>  <PendingSingleProduct key={product._id} product={product} refetch={refetch}/>)
      } */}
      {
        reportedProducts.map((reportedProduct, index)=> <ReportedSingleProduct key={index} reportedProduct={reportedProduct} refetch={refetch}/>)
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

export default ReportedContent