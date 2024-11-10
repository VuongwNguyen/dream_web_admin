"use client";
import { NAVIGATIONS } from "@/constants/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = () => {
  const pathName = usePathname();

  return (
    <div className="px-4 flex-col justify-between h-full">
      {NAVIGATIONS.map(({ title, url, icon }, index) => (
        <div key={index} className="m-2 mb-5">
          <Link href={url}>
            <div
              className={`flex items-center rounded-lg px-0
                            hover:opacity-100
                            ${
                              pathName.includes(url) &&
                              "rounded-lg bg-white shadow-xl"
                            }`}
            >
              <div>
                <div>{/* icon */}</div>
                <div className="flex items-center p-2">
                  <span
                    className={`text-lg font-semibold ${
                      pathName.includes(url) ? "text-[#0CBBF0]" : "text-white"
                    }`}
                  >
                    {title}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navigation;