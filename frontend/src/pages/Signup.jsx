import Header from "../loginForm/Header";
import Signup from "../loginForm/Signup";

export default function SignupPage({ sidebarToggle }) {
    return (
        <>
                <div className={`flex justify-center transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"
                    }`}>
                    <div className="bg-blue-300 py-8 px-4 my-8 rounded-lg shadow-2xl">
                        <Header
                            heading="Signup to create an account"
                            paragraph="Already have an account? "
                            linkName="Login"
                            linkUrl="/LoginOrSignup"
                        />
                        <Signup />
                    </div>
                </div>
        </>
    )
}