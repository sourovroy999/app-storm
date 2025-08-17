import { useEffect } from 'react';
import Banner from '../../components/Home/Banner/Banner';
import FeaturedProducts from '../../components/Home/Products/FeaturedProducts';
import Container from '../../components/shared/Container';
import { useLocation, useNavigate } from 'react-router';
import useUpvote from '../../hooks/useUpvote';
import useAuth from '../../hooks/useAuth';
import TrendingProducts from '../../components/Home/Products/TrendingProducts';

const Home = () => {

    const{search}=useLocation()
    const{upvoteProduct}=useUpvote()
    const {user}=useAuth()
    const navigate=useNavigate()

   useEffect(() => {
    const params = new URLSearchParams(search);
    const productId = params.get("upvote");

    if (productId && user) {
      const autoUpvote = async () => {
        try {
          await upvoteProduct(productId);
          console.log("✅ Auto-upvoted product:", productId);
        } catch (error) {
          console.error("❌ Auto-upvote failed:", error);
        } finally {
          // Clean up URL
          navigate("/", { replace: true });
        }
      };

      autoUpvote();
    }
  }, [user, search, upvoteProduct, navigate]);


    return (
        <>
            <Banner/>
        <Container>
            <FeaturedProducts/>
            <div className='px-'>

            <TrendingProducts/>
            </div>
            

        </Container>
        </>
    );
};

export default Home;