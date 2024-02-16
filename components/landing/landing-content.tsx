"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Joel",
    avatar: "J",
    title: "Software Engineer",
    description: "This is the best application I've ever used!",
    color: "bg-white",
  },
  {
    name: "Antonio",
    avatar: "A",
    title: "Designer",
    description: "I use this daily for generating new photos!",
    color: "bg-yellow-500",
  },
  {
    name: "Mark",
    avatar: "M",
    title: "CEO",
    description:
      "This app has changed my life, cannot imagine working without it!",
    color: "bg-emerald-300",
  },
  {
    name: "Mary",
    avatar: "M",
    title: "CFO",
    description:
      "The best in class, definitely worth the premium subscription!",
    color: "bg-pink-200",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full bg-slate-300 text-3xl text-center text-black select-none flex items-center justify-center",
                    item.color
                  )}
                >
                  {item.avatar}
                </div>
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
