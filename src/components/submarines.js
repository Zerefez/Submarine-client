import React from "react";
import { ButtonOutline, ButtonPrimary } from "./button";

const Submarines = () => {
  return (
    <section id="home" className="pt-28 lg:pt-36">
      <div className="w-full max-w-[1300px] mx-auto px-10 lg:grid lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <figure className="w-9 h-9 rounded-lg">
              <img
                src="images/submarine-2.svg"
                width={40}
                height={40}
                alt="Submarine"
                className="img-cover"
              />
            </figure>
            <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              Available Submarines
            </div>
          </div>
          <h2 className="headline-1 max-w-[30ch] sm:max-w-[40ch] lg:max-w-[20ch] mt-5 mb-8 lg:mb-10">
            Select an available submarine to start your underwater adventure.
          </h2>
          <div className="flex items-center gap-3">
            <ButtonPrimary
              label="Select submarine"
              icon ="arrow_drop_down"
              isDropdown={true}
              options={[
                { value: "1", label: "Zerefez" },
                { value: "2", label: "KHALed" },
                { value: "3", label: "Muhandizi" },
                { value: "4", label: "shah rukh khanizzi" },
                { value: "5", label: "AHmadizzi Uchiha" },
                { value: "6", label: "DAnielizzi" },
                { value: "7", label: "ERMRZZI" },
                { value: "8", label: "CHrisizzi" },
                { value: "9", label: "ALIZZI" }
              ]}
            />
            <ButtonOutline
              href="#about"
              label="Scroll down"
              icon="arrow_downward"
            />
          </div>
        </div>
        <div className="w-full h-auto lg:grid-cols-1">
          <figure className="w-full ml-auto bg-gradient-to-t from-sky-700 via-25% via-sky-900/40 to-65% rounded-[60px] overflow-hidden mt-20 ">
            <img
              src="/images/submarine.png"
              width={1600}
              height={900}
              alt="Subs"
              className="w-full h-auto"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Submarines;
