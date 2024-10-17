import PropTypes from "prop-types";

import React from 'react';

const ButtonPrimary = ({
  href,
  target = "_self",
  label,
  icon,
  classes,
  isDropdown,
  options
}) => {
  if (isDropdown && options) {
    return (
      <div className={"btn btn-primary " + classes}>
        <select
          id="subs"
          className="block text-sm rounded-e-lg w-full p-2.5 bg-sky-400 no-border">
          <option selected> {label} </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {icon ?
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
          : undefined
        }
      </div>
    );
  }

  if (href) {
    return (
      <a href={href} target={target} className={"btn btn-primary " + classes}>
        {label}
      </a>
    );
  } else {
    return (
      <button className={"btn btn-primary " + classes}>
        {label}
      </button>
    );
  }
};

ButtonPrimary.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string,
  isDropdown: PropTypes.bool,  // New prop type
  options: PropTypes.arrayOf(   // Dropdown options prop type
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};
  
  const ButtonOutline = ({
    href,
    target = '_self',
    label,
    icon,
    classes
  }) => {
    if (href) {
      return (
        <a
          href={href}
          target={target}
          className={"btn btn-outline " + classes}
        >
          {label}
  
          {icon ?
            <span className="material-symbols-rounded" aria-hidden="true">
              {icon}
            </span>
            : undefined
          }
        </a>
      )
    } else {
      return (
        <button className={"btn btn-outline " + classes}>
          {label}
  
          {icon ?
            <span className="material-symbols-rounded" aria-hidden="true">
              {icon}
            </span>
            : undefined
          }
        </button>
      )
    }
  }
  
  ButtonOutline.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.string,
    classes: PropTypes.string
  }
  
  export {
  ButtonOutline, ButtonPrimary
};

