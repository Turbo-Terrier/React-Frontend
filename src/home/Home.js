import HomeIntro from "./components/HomeIntro";
import TurboTerrierFeatures from "./components/TurboTerrierFeatures";
import ImageSlides from "./components/ImageSlides";
import Pricing from './components/Pricing'
import Faq from "./components/FAQ";

function Home() {
    return (
        <>
            <HomeIntro />
            <TurboTerrierFeatures />
            <ImageSlides />
            <Pricing />
            <Faq />
        </>
    );
}



export default Home