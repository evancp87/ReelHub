// use client
import Dashboard from "./Dashboard";

import Sidebar from "./Sidebar";
import Controls from "./Controls";
export default async function HomePage() {
  // const { isLoading, isFetching, data, error } = useGetMediaQuery(null);
  // const { isLoading, isFetching, data, error } = useGetTrendingMediaQuery(null);

  return (
    // <Layout>
    // </Layout>
    <div className="flex flex-col bg-[#10141E] md:flex-row ">
      <Sidebar />
      <main className="flex min-h-screen flex-col items-center   pt-[2em]">
        <Controls />
        <Dashboard />
      </main>
    </div>
  );
}
