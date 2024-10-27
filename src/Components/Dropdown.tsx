import { FC, useRef, useState } from "react";
import { DropdownProps } from "../Utils/Props";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const Dropdown: FC<DropdownProps> = ({ text, options }) => {
  const ref = useRef<HTMLDivElement>(null); // Type the ref
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (event: React.FocusEvent) => {
    // Check if the new focused element is outside the dropdown
    if (ref.current && !ref.current.contains(event.relatedTarget as Node)) {
      setIsFocused(false);
    }
  };

  return (
    <div className="dropdown" ref={ref}>
      <div
        tabIndex={0}
        role="button"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="btn rounded-md text-white bg-slate-700 hover:bg-slate-500"
      >
        {text}
        {isFocused ? <GoTriangleUp /> : <GoTriangleDown />}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-gray-800 rounded-box z-1 w-52 p-1 shadow join join-vertical"
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={option.handleClick}
            className={`${
              option.handleClick
                ? "hover:cursor-pointer hover:bg-slate-600"
                : "font-bold text-base"
            } rounded-md py-1 px-2 text-gray-200 hover:text-white hover:font-bold border border-slate-600 join-item`}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
