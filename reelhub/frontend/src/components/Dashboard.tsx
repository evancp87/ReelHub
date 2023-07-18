import React from "react";
import Trending from "./Trending";
import Recommended from "./Recommended";
import Controls from "./Controls";
type Props = {};

export default function Dashboard({}: Props) {
  return (
    <div className="bg-[#10141E]">
      {/* <Controls /> */}
      <Trending />
      <Recommended />
    </div>
  );
}
