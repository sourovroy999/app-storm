import Banner from '../../components/Home/Banner/Banner';
import Products from '../../components/Home/Products/Products';
import Container from '../../components/shared/Container';

const Home = () => {
    return (
        <>
        <Container>
            <Banner/>
            <Products/>

        </Container>
        </>
    );
};

export default Home;