import React from "react";
import { ReactNode } from "react";
import { FlowDiagram } from "../components/FlowDiagram";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

type Props = {
  children: ReactNode
  showFlowChart: boolean
  setShowFlowChart: (show: boolean) => void
}

export const ShowcaseLayout = ({ children, showFlowChart, setShowFlowChart }: Props) => {
  return (
    <div className="h-screen flex flex-col relative">
      <Header />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <Sidebar />
        <main className="w-full overflow-y-auto p-4">
          {children}
        </main>
        {/*<FlowDiagram  showFlowChart={showFlowChart} setShowFlowChart={setShowFlowChart} />*/}
      </div>
    </div>
  );
};
