import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Testimonial />
        <WhyChooseUs />
      </main>

      <Footer />
    </>
  );
};

export default Home;