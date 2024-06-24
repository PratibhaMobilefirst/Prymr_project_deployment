import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OnBoardingPage from "./OnBoardingPage";
import blueFly from "../../assets/blue-fly.png";
import deepBlueSky from "../../assets/Deep_Blue_Sky_Clouds_Timelapse_Free_Footage_Full_HD_1080p.svg";
import grayClouds from "../../assets/gray_clouds.svg";
import imageLogo from "../../assets/logo.png";

function OnBoarding() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ResizeObserverSize: 10,
  };

  const onBoardingData = [
    {
      imageUrl: blueFly,
      logoUrl: imageLogo,
      title: "Create Your Space",
      description:
        "Craft your unique profile, share your passions, and showcase your talents. Your content is your canvas paint it with your creativity..",
    },
    {
      imageUrl: deepBlueSky,
      logoUrl: imageLogo,
      title: "Connect Authentically",
      description:
        " Discover a network of like-minded creators and enthusiasts who appreciate you for more than just a like. Engage in meaningful conversations and inspire each other.",
    },
    {
      imageUrl: grayClouds,
      logoUrl: imageLogo,
      title: "Monetise Your Passion",
      description:
        " Prymr believes in the value you bring. Explore ways to turn your creativity into income and achieve the economic freedom you deserve.",
    },
  ];

  return (
    <Slider {...settings} className="bg-white h-[45vh] ">
      {onBoardingData.map((data, index) => (
        <OnBoardingPage
          key={index}
          imageUrl={data.imageUrl}
          logoUrl={data.logoUrl}
          title={data.title}
          description={data.description}
        />
      ))}
    </Slider>
  );
}

export default OnBoarding;
