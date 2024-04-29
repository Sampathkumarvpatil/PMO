import { useEffect, useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useRegisterOrLoginUser } from "../utils/useSaveUserSignUpData";
import { setValidationKey } from "../utils/temp";
const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login({ buttonClick }) {
  const [loginState, setLoginState] = useState(fieldsState);
  const { error, isLoading, saveUser, success, data } =
    useRegisterOrLoginUser();

  useEffect(() => {
    if (!error && success && data?.role) {
      sessionStorage.setItem("role", data?.role);
      sessionStorage.setItem("key", loginState?.validation);
      buttonClick();
    }
  }, [success, error, data?.role]);
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    console.log(loginState);
    const data = {
      operation: "login",
      username: loginState.username,
      password: loginState.password,
      validation_key: loginState.validation,
    };
    setValidationKey(loginState.validation);
    await saveUser(data);
  };

  return (
    <div className="w-100">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {/* <div className="flex justify-end">
          <select className="px-3 py-2 rounded-md w-full">
            <option className="px-4 py-2">Select Role</option>
            <option className="px-4 py-2">
              Account Manager/Project Manager
            </option>
            <option className="px-4 py-2">Developers/Testers</option>
          </select>
        </div> */}
        {/* <div className="-space-y-px"> */}
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        {/* </div> */}

        <FormExtra />
        <FormAction handleSubmit={handleSubmit} text="Login" />
        {error && <div className="text-red-500 p-1">{error}</div>}
        {isLoading && (
          <div className="text-white p-1"> Logging you in please wait...</div>
        )}
      </form>
    </div>
  );
}
