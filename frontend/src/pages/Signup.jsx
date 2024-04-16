import Header from "../loginForm/Header";
import Signup from "../loginForm/Signup";
// import signUpImage from "../assets/signup.gif";
import "./form.css"


export default function SignupPage() {
  return (
    <>
      <div
        className={`flex justify-center transition-all duration-300 my-auto`}
      >
        {/* <div className="w-[475px] mt-8">
          <img src={signUpImage} alt="" className="h-[625px] rounded-xl" />
        </div> */}
        <div className="wrapper bg-gray-200 py-8 px-8 my-8 rounded-lg shadow-2xl">
          <Header
            heading="Sign-Up your account"
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/"
          />
          <Signup />
        </div>
      </div>
    </>
  );
}
