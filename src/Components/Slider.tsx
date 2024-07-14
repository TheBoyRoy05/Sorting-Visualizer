import { FC } from "react";
import { SliderProps } from "../Utils/Props";
import "../Styles/slider.css"

const Slider: FC<SliderProps> = ({ min, max, step, text, value, setValue }) => {
  return (
    <div className={"slider-container " + text.toLowerCase().replace(" ", "")}>
      <p className="slider-text">{text}</p>
      <input
        className="slider"
        type="range"
        onChange={(e) => setValue(Number(e.target.value))}
        min={`${min}`}
        max={`${max}`}
        step={step}
        value={value}
      />
      <input
        className="slider-input"
        value={value}
        onChange={(e) =>
          setValue(Math.max(min, Math.min(max, Number(e.target.value))))
        }
      />
    </div>
  );
};

export default Slider;
