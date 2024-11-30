import React from "react";
import { ButtonPrimary } from "../components/button";

const sitemap = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Analytics",
    href: "#analytics",
  },
  {
    label: "Mockdata",
    href: "#mockdata",
  },
  {
    label: "Data",
    href: "#data",
  },
  {
    label: "Contact us",
    href: "#contact",
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Zerefez/Submarine-client",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andr%C3%A9-rashid-96a894273/",
  },
  {
    label: "Twitter X",
    href: "https://x.com/elonmusk",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jjohnart/",
  },
  {
    label: "Project Overleaf",
    href: "https://www.overleaf.com/project/66defc720e64c81037db0f2e",
  },
];

const Footer = () => {
  return (
    <footer className="section">
      <div className="container">
        <div className=" lg:grid lg:grid-cols-2  ">
          <div className=" mb-10 ">
            <h2 className="headline-2 mb-8 lg:max-w-[25ch]">
              If you want to support our team, you can donate here
            </h2>
            <ButtonPrimary
              href="https://www.paypal.com/donate/?hosted_button_id=UQA8G5A535H3C"
              target="_blank"
              label="Donation"
              icon="chevron_right"
            />
          </div>
          <div className=" grid grid-cols-2 gap-4 lg:pl-20">
            <div>
              <p className="mb-2">Sitemap</p>
              <ul>
                {sitemap.map(({ label, href }, key) => (
                  <li key={key}>
                    <a
                      href={href}
                      className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2">Socials</p>
              <ul>
                {socials.map(({ label, href }, key) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="blank"
                      className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-10 mb-8">
          <a href="blank" className="">
            <img
              src="images\Submarine.svg"
              width={40}
              height={40}
              alt="Submarine"
            />
          </a>
          <p className="text-zic-500 text-sm">
            &copy; 2024 Submarine. All rights reserved.
            <span className="text-zinc-200">Group 7</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
