import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import SingleFeaturedProduct from "./SingleFeaturedProduct";
import { Link } from "react-router";

const TrendingProducts = () => {

    const axiosCommon=useAxiosCommon();

    const{data: trendingProducts=[], isLoading, refetch}=useQuery({
        queryKey:['tendingProducts'],
        queryFn:async()=>{
            const {data}=await axiosCommon.get('/trending-products')

            return data;
        },
        onError: (err)=>{
      console.error('Error fetching trending products:', err.message);

        }

    });

  if (isLoading) return <p>Loading...</p>;

  console.log(trendingProducts);
  



    return (
        <div>
      <h2 className="text-3xl font-bold my-4">Trending Products</h2>

           <p className="text-xs opacity-60 tracking-wide mb-4">Top Upvoted treding products</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                trendingProducts.map(product=><SingleFeaturedProduct product={product} refetch={refetch} showTrendingBadge={true}/>)
            }
            </div>

            <div>
                <Link to={'/products'}>
                <button className="btn mt-5 bg-green-500 text-white flex mx-auto mb-10">See All Products</button>
                </Link>
            </div>
            
        </div>
    );
};

export default TrendingProducts;