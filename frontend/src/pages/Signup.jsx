import Header from "../loginForm/Header";
import Signup from "../loginForm/Signup";

export default function SignupPage(){
    return(
        <>
            <div className="flex justify-center">
            <div className="bg-blue-300 p-8 my-8 rounded-lg shadow-2xl">
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/LoginOrSignup"
            />
            <Signup/>
            </div>
            </div>
        </>
    )
}