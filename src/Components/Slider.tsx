import { FC } from "react";

interface SliderProps {
  text: string;
  min: number;
  max: number;
  value: number;
  setValue: (value: number) => void;
}

const Slider: FC<SliderProps> = ({ min, max, text, value, setValue }) => {
  return (
    <div className="slider">
      <p className="slider-text">{text}</p>
      <input
        type="range"
        onChange={(e) => setValue(Number(e.target.value))}
        min={`${min}`}
        max={`${max}`}
        value={value}
      />
      <p className="slider-value">{value}</p>
    </div>
  );
};

export default Slider;
