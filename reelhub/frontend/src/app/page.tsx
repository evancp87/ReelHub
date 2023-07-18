import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import axios from "axios";

export default async function Home() {
  // const { data } = await axios.get("../data.json");

  // console.log(data);

  // return (
  //   <div className="flex flex-col md:flex-row">
  //     <Sidebar />
  //     <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //       {/* {!data ? <p>Loading</p> : <Dashboard />} */}
  //       <Dashboard />
  //     </main>
  //   </div>
  // );

  return <Dashboard />;
}
