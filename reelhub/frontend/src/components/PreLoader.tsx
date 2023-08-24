"use client";
import { useRef } from "react";
import { store } from "@/store/store";
import { setInitialMedia } from "@/store/services/mediaSlice";
import { Media } from "@/types/media";
type Props = {};

export default function PreLoader({ media }: { media: Media[] }): null {
  const loaded = useRef(false);

  if (!loaded.current) {
    store.dispatch(setInitialMedia(media));
    loaded.current = true;
  }
  return null;
}
