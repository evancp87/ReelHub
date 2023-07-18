import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import layout from "./layout";

type Props = {};

function page({}: Props) {
  return (
    <layout>
      <div className="rounded-lg border-2 border-solid border-slate-100">
        <h3>Sign Up</h3>
        <form className="flex flex-col" action="">
          <input className="my-4" type="text" />
          <input className="my-4" type="text" />
          <input className="my-4" type="text" />
          <button>Create an account</button>
        </form>
        <p>Already have an account?</p>
      </div>
    </layout>
  );
}

export default page;
