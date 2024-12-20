import PropTypes from "prop-types";
import { useLayoutEffect, useRef } from "react";

const Navbar = ({ navOpen }) => {
  const lastActiveLink = useRef(null);
  const activeBox = useRef(null);
  const initActiveBox = () => {
    if (lastActiveLink.current && activeBox.current) {
      activeBox.current.style.top = lastActiveLink.current.offsetTop + "px";
      activeBox.current.style.left = lastActiveLink.current.offsetLeft + "px";
      activeBox.current.style.width = lastActiveLink.current.offsetWidth + "px";
      activeBox.current.style.height =
        lastActiveLink.current.offsetHeight + "px";
    }
  };

  useLayoutEffect(() => {
    initActiveBox();

    window.addEventListener("resize", initActiveBox);

    return () => window.removeEventListener("resize", initActiveBox);
  }, []);

  const activeCurrentLink = (event) => {
    if (lastActiveLink.current) {
      lastActiveLink.current.classList.remove("active");
    }

    event.target.classList.add("active");
    lastActiveLink.current = event.target;

    if (activeBox.current) {
      activeBox.current.style.top = event.target.offsetTop + "px";
      activeBox.current.style.left = event.target.offsetLeft + "px";
      activeBox.current.style.width = event.target.offsetWidth + "px";
      activeBox.current.style.height = event.target.offsetHeight + "px";
    }
  };

  const navItems = [
    {
      label: "Home",
      link: "#home",
      className: "nav-link active",
      ref: lastActiveLink,
    },
    {
      label: "About",
      link: "#about",
      className: "nav-link",
      ref: null,
    },
    {
      label: "Analysis",
      link: "#analysis",
      className: "nav-link",
      ref: null,
    },

    {
      label: "Data collection",
      link: "#data-collection",
      className: "nav-link",
      ref: null,
    },

    {
      label: "Data",
      link: "#data",
      className: "nav-link",
      ref: null,
    },
    {
      label: "Contact",
      link: "#contact",
      className: "nav-link",
      ref: null,
    },
    {
      label: "User",
      link: "#user",
      className: "nav-link md:hidden",
      ref: null,
    },
  ];
  return (
    <nav className={"navbar " + (navOpen ? "active" : "")}>
      {navItems.map(({ label, link, className, ref }, key) => (
        <a
          href={link}
          key={key}
          ref={ref}
          className={className}
          onClick={activeCurrentLink}
        >
          {label}
        </a>
      ))}
      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};
export default Navbar;
