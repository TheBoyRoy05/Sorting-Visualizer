import { FC, useState } from "react";
import { DropdownProps } from "../Utils/Props";

const Dropdown: FC<DropdownProps> = ({ text, options }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className="dropdown">
      <button
        className={
          "dropdown-text-container btn " +
          (selected ? "show-button" : "hide-button")
        }
        onClick={() => setSelected(!selected)}
      >
        <p className="dropdown-text">{text}</p>
        <div className={selected ? "arrow-up" : "arrow-down"}></div>
      </button>
      <div className={selected ? "options" : "hide"}>
        {options.map((option, index) => {
          const disabled = typeof option.handleClick == "undefined";
          return (
            <button
              className={disabled ? "disabled" : "btn option"}
              onClick={() => {
                if (option.handleClick) option.handleClick();
                setSelected(false);
              }}
              key={index}
              disabled={disabled}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
