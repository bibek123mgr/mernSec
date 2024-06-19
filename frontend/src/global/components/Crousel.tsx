import React, { useState } from "react";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    {
      src: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
      alt: "Wild Landscape",
    },
    {
      src: "https://mdbcdn.b-cdn.net/img/new/slides/042.webp",
      alt: "Camera",
    },
    {
      src: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp",
      alt: "Exotic Fruits",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div id="carouselExampleCrossfade" className="relative">
      <div className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleIndicatorClick(index)}
            className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-${
              activeIndex === index ? "100" : "50"
            } transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{ height: "300px" }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`relative float-left -mr-[100%] w-full ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            } transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none`}
            style={{ height: "300px" }}
          >
            <img
              src={slide.src}
              className="block w-full h-full object-cover"
              alt={slide.alt}
            />
          </div>
        ))}
      </div>

      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        onClick={handlePrev}
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="sr-only">Previous</span>
      </button>
      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        onClick={handleNext}
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
