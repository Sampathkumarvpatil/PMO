import { useState } from "react";
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = () => {};

  return (
    <div className="w-full ">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-end">
          <select className="px-3 py-2 rounded-md w-full">
            <option className="px-4 py-2">Select Role</option>
            <option className="px-4 py-2">
              Account Manager/Project Manager
            </option>
            <option className="px-4 py-2">Developers/Testers</option>
          </select>
        </div>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
    </div>
  );
}
