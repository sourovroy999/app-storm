
//here all the products will be seen
import MySingleProduct from './MySingleProduct';
import useMyProducts from '../../../../../hooks/useMyProducts';
import LoadingSpinner from '../../../../Spinner/LoadingSpinner';
import { Link } from 'react-router';

const Products = () => {



    const{ products, refetch, isLoading }=useMyProducts();



  
    

    if (isLoading) return <LoadingSpinner/>

    console.log(products);
if (products.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-10  text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png"
        alt="No products"
        className="w-32 h-32 mb-4 opacity-70 dark:opacity-60"
      />
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
        You haven’t posted any products yet
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Start sharing your amazing products with the community.
      </p>
      <Link
        to="/dashboard/add-product"
        className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md btn"
      >
        Post Your First Product
      </Link>
    </div>
  );
}




    return (
        <div className="">
            <div className="text-3xl font-bold my-4 text-center">
                Your Products
            </div>

            <div>

                <ul className="list bg-base-100 rounded-box shadow-md ">

                   

                <div className="overflow-x-auto ">
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