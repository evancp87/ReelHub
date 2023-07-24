import { store } from "@/store/store";
import layout from "../layout";
import { setInitialMedia, selectMedia } from "../features/mediaSlice";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const req = await fetch("http://localhost:3000/api/search");
  const data = await req.json();
  store.dispatch(setInitialMedia(data));
  console.log(data);

  return (
    <layout>
      <Dashboard />
    </layout>
  );
}
