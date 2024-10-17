import PropTypes from "prop-types";

import React, { useState } from "react";

const ButtonPrimary = ({
  href,
  target = "_self",
  label,
  classes,
  isDropdown,
  availableOptions,
  unavailableOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  if (isDropdown && availableOptions && unavailableOptions) {
    return (
      <div className="relative inline-block">
        <button
          id="dropdownButton"
          onClick={toggleDropdown}
          className={"btn btn-primary " + classes + " inline-flex items-center"}
        >
          {label}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="z-10 absolute bg-zinc-200 divide-y divide-zinc-100 rounded-lg shadow w-44 dark:bg-zinc-700 dark:divide-zinc-600 mt-2">
            <div className="px-4 py-3 text-sm text-zinc-900 dark:text-white">
              <div>Available Submarines</div>
            </div>
            <ul
              className="py-2 text-sm text-zinc-700 dark:text-zinc-200"
              aria-labelledby="dropdownButton"
            >
              {availableOptions.length ? (
                availableOptions.map((option) => (
                  <li key={option.value}>
                    <a
                      href={href}
                      target={target}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {option.label}
                    </a>
                  </li>
                ))
              ) : (
                <li className="block px-4 py-2 text-gray-400">
                  No available submarines
                </li>
              )}
            </ul>

            <div className="px-2 py-3 text-sm text-zinc-900 dark:text-white">
              <div>Unavailable Submarines</div>
            </div>
            <ul className="py-4 text-sm text-zinc-700 dark:text-gray-200">
              {unavailableOptions.length ? (
                unavailableOptions.map((option) => (
                  <li key={option.value}>
                    <a
                      href={href}
                      target={target}
                      className="block px-4 py-2 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
                    >
                      {option.label}
                    </a>
                  </li>
                ))
              ) : (
                <li className="block px-2 py-2 text-zinc-400">
                  No unavailable submarines
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return <button className={"btn btn-primary " + classes}>{label}</button>;
};

ButtonPrimary.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.string,
  isDropdown: PropTypes.bool,
  availableOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  unavailableOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

const ButtonOutline = ({ href, target = "_self", label, icon, classes }) => {
  if (href) {
    return (
      <a href={href} target={target} className={"btn btn-outline " + classes}>
        {label}

        {icon ? (
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
        ) : undefined}
      </a>
    );
  } else {
    return (
      <button className={"btn btn-outline " + classes}>
        {label}

        {icon ? (
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
        ) : undefined}
      </button>
    );
  }
};

ButtonOutline.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string,
};

export { ButtonOutline, ButtonPrimary };
