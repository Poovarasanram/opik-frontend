import React from "react";
import { cn } from "@/lib/utils";
import imageLogoUrl from "/ejyle-logo.svg";

type LogoProps = {
  expanded: boolean;
};

const Logo: React.FunctionComponent<LogoProps> = ({ expanded }) => {
  return (
    <>
      <div className="flex text-center">
        <img
          className={cn(
            "h-8 object-cover object-left -ml-[3px] mr-[3px] inline",
            {
              "w-[32px]": !expanded,
            },
          )}
          src={imageLogoUrl}
          alt="opik logo"
        />
        <h1 className="text-2xl font-bold">
          Smart<span className="text-red-500">Assist</span>
        </h1>
      </div>
    </>
  );
};

export default Logo;
