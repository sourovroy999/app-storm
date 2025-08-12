
//here all the products will be seen
import { useQuery } from '@tanstack/react-query'

import SingleProduct from "./SingleProduct";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const Products = () => {

    const axiosCommon=useAxiosCommon()

    const{data: products=[], isLoading }=useQuery({
        queryKey:['products'],
        queryFn:async()=>{
            const{data}=await axiosCommon.get('/products')
            
            return data
        },
        onError:(err)=>{
            console.log(err.message);
            
        }
        
    })

    if (isLoading) return <p>Loading...</p>;

    console.log(products);


    return (
        <div className="md:ml-20">
            <div className="text-3xl font-bold my-4">
                All products
            </div>

            <div>

                <ul className="list bg-base-100 rounded-box shadow-md max-w-xl">

                    {/* <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most recent product of this week</li> */}


                    {
                        products.map(product => <SingleProduct  key={product._id} product={product}/>
                        )
                    }


                </ul>

            </div>




        </div>
    );
};

export default Products;