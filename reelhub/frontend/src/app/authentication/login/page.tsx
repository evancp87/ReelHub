import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import layout from "./layout";
import 
  { useLoginUserMutation }
 from "../../../store/services/userApi";
import { userAgent } from "next/server";
type Props = {};

function page({}: Props) {
const [user, setUser] = useState({
  name: "",
  email: "",
  password: ""
})

const handleInputs = (e) => {
  const {name, value} = e.target;
  setUser((inputs) => ({ ...inputs, [name]: value }));

}
  const {loginUser, {isLoading: isLoggingIn} } = useLoginUserMutation;

 
  try {
    const result = await createUser(setUser({name, email, password}),{
      headers: headers,
      method: "POST",
      bearer: bearer

    });
    
  } catch (error) {
    console.log("There was an error:", error);
    
  }
  return (
    <layout>
      <div className="rounded-lg border-2 border-solid border-slate-100">
        <h3>Login</h3>
        <form className="flex flex-col" action="" onSubmit={handleLogin} disabled={isLoggingIn}>
          <input value={user.name} onChange={handleInputs} className="my-4" type="text" />
          <input value={user.email} onChange={handleInputs} className="my-4" type="text" />
          <input value={user.password} onChange={handleInputs} className="my-4" type="text" />
          <button>Login to your account</button>
        </form>
        <p>Don't have an account? Sign up</p>
      </div>
    </layout>
  );
}

export default page;
