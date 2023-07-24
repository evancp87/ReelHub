"use client";
import { useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import axios from "axios";
import layout from "./layout";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setMedia, search } from "@/features/mediaSlice";
import PreLoader from "@/components/PreLoader";
// // import { AppDispatch } from "@/store/store";
// import { useEffect, useState, useCallback } from "react";
import { store } from "@/store/store";
import { setInitialMedia, selectMedia } from "../features/mediaSlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetMediaQuery } from "../store/services/mediaApi";
export default async function Home() {
  // const req = await fetch("http://localhost:3000/api/search");
  // const data = await req.json();

  const { isLoading, isFetching, data, error } = useGetMediaQuery(null);
  // store.dispatch(setInitialMedia(data));
  // const initialMedia = useSelector(selectMedia);
  // console.log("the store is:", store);

  // const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch<AppDispatch>();

  // const getData = useCallback(() => {
  //   dispatch(setMedia());
  //   setLoading(false);
  // }, [dispatch]);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // useEffect(() => {
  //   if (!initialMedia) {
  //     store.dispatch(setInitialMedia(data));
  //   }
  // }, [initialMedia]);

  return (
    <layout>
      {/* <PreLoader media={data}> */}
      {/* {!data ? <p>Loading</p> : <Dashboard />} */}
      <Dashboard />
      {/* <div>{JSON.stringify(data)}</div> */}

      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {data.map((media) => (
            <div
              // key={user.id}
              style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
              {media}
            </div>
          ))}
        </div>
      ) : null}
    </layout>
  );
}
