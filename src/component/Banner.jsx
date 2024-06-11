import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import image1 from "../assets/Img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";

const Banner = () => {
  return (
    <div className="relative w-full px-[5%]">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        transitionTime={2}
        showStatus={false}
        className="carousel-root"
      >
        <div className="relative h-[90vh]">
          <img
            src={image1}
            className="rounded-lg shadow-lg w-full h-full object-cover"
            alt="Slide 1"
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-6 rounded-lg shadow-md text-center max-w-md">
            <h3 className="text-lg font-semibold mb-2">Study Tip 1</h3>
            <p className="text-sm">
              Remember to take regular breaks to keep your mind fresh and
              focused.
            </p>
          </div>
        </div>
        <div className="relative h-[90vh]">
          <img
            src={image3}
            className="rounded-lg shadow-lg w-full h-full object-cover"
            alt="Slide 2"
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-6 rounded-lg shadow-md text-center max-w-md">
            <h3 className="text-lg font-semibold mb-2">Study Tip 2</h3>
            <p className="text-sm">
              Create a quiet and organized study space to improve concentration.
            </p>
          </div>
        </div>
        <div className="relative h-[90vh]">
          <img
            src={image2}
            className="rounded-lg shadow-lg w-full h-full object-cover"
            alt="Slide 3"
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-lg shadow-md text-center max-w-md">
            <h3 className="text-lg font-semibold mb-2">Study Tip 3</h3>
            <p className="text-sm">
              Use visual aids like diagrams and charts to better understand
              complex topics.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
