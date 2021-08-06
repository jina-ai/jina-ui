import React from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

type Props = {
  children: any;
};

export const HeaderAndSidebarLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col relative">
      <Header />
      <div className="flex flex-row flex-1 overflow-hidden">
        <Sidebar />
        <main className="w-full overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};
