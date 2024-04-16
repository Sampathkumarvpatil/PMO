import { useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
 
const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));
 
export default function Login({buttonClick}) {
  const [loginState, setLoginState] = useState(fieldsState);
 
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
    buttonClick();
  };
 
  //Handle Login API Integration here
  const authenticateUser = () => { };
 
  return (
    <div className="w-100">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-end">
          <select className="px-3 py-2 rounded-md w-full">
          <option className="px-4 py-2">Select Role</option>
          <option className="px-4 py-2">Account Manager/Project Manager</option>
          <option className="px-4 py-2">Developers/Testers</option>
          </select>
        </div>
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
      </form>
    </div>
  );
}