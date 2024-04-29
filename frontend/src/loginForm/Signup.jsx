import { useState } from "react";
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useRegisterOrLoginUser } from "../utils/useSaveUserSignUpData";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const { error, isLoading, saveUser, success } = useRegisterOrLoginUser();
  const [role, setRole] = useState("Account Manager/Project Manager");
  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createAccount();
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    console.log(role);
    const data = {
      operation: "signup",
      username: signupState.username,
      email: signupState["email-address"],
      password: signupState.password,
      bu_name: signupState["BU Name"],
      validation_key: signupState.validation,
      role: role,
    };
    await saveUser(data);
  };

  return (
    <div className="w-full ">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-end">
          <select
            className="px-3 py-2 rounded-md w-full"
            value={role}
            onChange={(e) => setRole(e.currentTarget.value)}
          >
            <option className="px-4 py-2">Select Role</option>
            <option
              className="px-4 py-2"
              value={"Account Manager/Project Manager"}
            >
              Account Manager/Project Manager
            </option>
            <option className="px-4 py-2" value={"Developers/Testers"}>
              Developers/Testers
            </option>
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
          <FormAction
            handleSubmit={handleSubmit}
            text="Signup"
            isLoading={isLoading}
          />
          {error && <div className="text-red-500 p-1">{error}</div>}
          {isLoading && (
            <div className="text-white p-1"> creating new user...</div>
          )}
          {!error && success && !isLoading && (
            <div className="text-green-500 p-1">
              User created successfully..
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
