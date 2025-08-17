import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import SingleFeaturedProduct from './SingleFeaturedProduct';

const FeaturedProducts = () => {
  const axiosCommon = useAxiosCommon();

  const { data: featuredProducts = [], isLoading , refetch} = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const { data } = await axiosCommon.get('/featured-products');
      return data;
    },
    onError: (err) => {
      console.error('Error fetching featured products:', err.message);
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="">
      <h2 className="text-3xl text-center font-bold my-6">Featured Products</h2>
      <ul className="bg-base-100 rounded-box  p-4">
        <li className="text-xs opacity-60 tracking-wide mb-4">Featured product of this week</li>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProducts.map(product => (
            <SingleFeaturedProduct key={product._id} product={product} refetch={refetch}/>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default FeaturedProducts;
