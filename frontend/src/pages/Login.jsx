import Header from "../loginForm/Header"
import Login from "../loginForm/Login"

export default function LoginPage({ sidebarToggle }){
    return(
        <>
              <div className={`flex justify-center transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"
                    }`}>
             <div className="bg-blue-300 p-8 my-8 rounded-lg shadow-2xl">
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
             </div>
             </div>
        </>
    )
}