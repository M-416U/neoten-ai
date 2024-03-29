"use client";

import ToolCard from "@/components/tool-card";
import { tools } from "@/constants";

const DashBoard = () => {
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <ToolCard tool={tool} key={tool.href} />
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
