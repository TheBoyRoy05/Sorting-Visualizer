import { FC } from "react";
import { SliderProps } from "../Utils/Props";

const Slider: FC<SliderProps> = ({ min, max, step, text, value, setValue }) => {
  return (
    <div className="slider">
      <p className="slider-text">{text}</p>
      <input
        type="range"
        onChange={(e) => setValue(Number(e.target.value))}
        min={`${min}`}
        max={`${max}`}
        step={step}
        value={value}
      />
      <p className="slider-value">{value}</p>
    </div>
  );
};

export default Slider;
