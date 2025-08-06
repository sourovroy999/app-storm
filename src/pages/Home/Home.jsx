import Banner from '../../components/Home/Banner/Banner';
import FeaturedProducts from '../../components/Home/Products/FeaturedProducts';
import Products from '../../components/Home/Products/Products';
import Container from '../../components/shared/Container';

const Home = () => {
    return (
        <>
        <Container>
            <Banner/>
            <FeaturedProducts/>
            <Products/>

        </Container>
        </>
    );
};

export default Home;