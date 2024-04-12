import Header from "../loginForm/Header"
import Login from "../loginForm/Login"
import loginGif from "../assets/header-login.webp"
export default function LoginPage({ sidebarToggle }){
    return(
        <>
              <div className={`flex justify-center transition-all duration-300 my-auto ${sidebarToggle ? "ml-0" : "ml-64"
                    }`}>
             <div className="bg-gray-200 p-8 my-8 rounded-lg shadow-2xl">
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
             </div>
             <div className="w-[500px] mt-8">
          <img src={loginGif} alt="" className="h-[530px] rounded-xl" />
        </div>
             </div>
        </>
    )
}