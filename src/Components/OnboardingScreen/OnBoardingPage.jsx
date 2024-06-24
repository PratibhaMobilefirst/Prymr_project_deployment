import WalletComponent from "../SignUpPage/WalletComponent";
import "./onboarding.css";

const OnBoardingPage = ({ title, description, imageUrl, logoUrl }) => {
  return (
    <div className="  overflow-y-auto h-screen">
      <div className=" bg-cover bg-center absolute h-[120vh] flex justify-center align-center">
        <img
          src={imageUrl}
          alt="Blue cloud"
          className="w-screen object-cover"
        />
      </div>
      <div className="flex flex-col h-[85vh] justify-between">
        <div className="relative flex items-center justify-center h-20 text-center text-white ">
          <img src={logoUrl} alt="logo" />
        </div>
        <div className="flex justify-center w-[100%] h-[58vh] -mt-20">
          <div className=" relative layout-container  text-white">
            <p className="text1 py-2">{title}</p>
            <p className="text2  mb-8">{description}</p>
            <div className="py-8">
              <WalletComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
