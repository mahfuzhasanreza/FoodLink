import banner1 from '../../assets/mz-banner1.jpg'
import banner2 from '../../assets/mz-banner-2.jpg'
import banner3 from '../../assets/mz-b-3.jpg'
import banner4 from '../../assets/mz-banner-4.jpg'


const Banner = () => {
    return (
        <div className="carousel w-full hidden md:flex h-[500px] bg-cover">
            <div id="slide1" className="carousel-item relative w-full h-[400px]">
                <img
                    src={banner2}
                    className="w-full h-full object-cover"
                    alt="Banner"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>

            <div id="slide2" className="carousel-item relative w-full">
                <img
                    src={banner1}
                    className="w-full h-[500px] object-cover" // Specify height and object-fit
                    alt="Slide 2"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src={banner4}
                    className="w-full h-[500px] object-cover"
                    alt="Slide 3"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img
                    src={banner3}
                    className="w-full h-[500px] object-cover"
                    alt="Slide 4"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>

        </div>
    );
};

export default Banner;