"use client";

import Header from "@/components/header";
import Langin from "@/components/langing";

export default function Home() {
  return (
    <>
      <Header isAuth={false} />
      <Langin />
    </>
  );
}
