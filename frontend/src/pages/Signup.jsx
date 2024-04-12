import Header from "../loginForm/Header";
import Signup from "../loginForm/Signup";
import signUpImage from "../assets/signup.gif";


export default function SignupPage({ sidebarToggle }) {
  return (
    <>
      <div
        className={`flex justify-center transition-all duration-300 ${
          sidebarToggle ? "ml-0" : "ml-64"
        }`}
      >
        <div className="w-[475px] mt-8">
          <img src={signUpImage} alt="" className="h-[625px] rounded-xl" />
        </div>
        <div className="bg-gray-200 py-8 px-4 my-8 rounded-lg shadow-2xl">
          <Header
            heading="Sign-Up your account"
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/LoginOrSignup"
          />
          <Signup />
        </div>
      </div>
    </>
  );
}
