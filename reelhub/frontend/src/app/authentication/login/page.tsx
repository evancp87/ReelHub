import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import layout from "./layout";

type Props = {};

function page({}: Props) {
  return (
    <layout>
      <div className="rounded-lg border-2 border-solid border-slate-100">
        <h3>Login</h3>
        <form className="flex flex-col" action="">
          <input className="my-4" type="text" />
          <input className="my-4" type="text" />
          <input className="my-4" type="text" />
          <button>Login to your account</button>
        </form>
        <p>Don't have an account? Sign up</p>
      </div>
    </layout>
  );
}

export default page;
