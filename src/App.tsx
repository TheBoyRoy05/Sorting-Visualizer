import { FC, useEffect, useState } from "react";
import SelectionSort from "./Algorithms/Selection";

interface BarProps {
  width: number;
  height: number;
  index: string;
}

const Bar: FC<BarProps> = ({ width, height, index }) => {
  const style = {
    height: `${height}px`,
    width: `${width}px`,
  };
  return (
    <div className="bar" id={index} style={style}>
      <p className="bar-text">{width > 30 ? height : ""}</p>
    </div>
  );
};

interface DisplayProps {
  heights: number[];
  numElems: number;
}

const Display: FC<DisplayProps> = ({ heights, numElems }) => {
  const DISPLAY_WIDTH = 1000;
  const MAX_WIDTH = 100;

  return (
    <div className="display">
      {heights.map((height, index) => (
        <Bar
          key={index}
          width={Math.min(DISPLAY_WIDTH / numElems, MAX_WIDTH)}
          height={height}
          index={index.toString()}
        />
      ))}
    </div>
  );
};

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

const App: FC = () => {
  const [arraySize, setArraySize] = useState(10);
  const [heights, setHeights] = useState<number[]>([]);

  const generate = (arraySize: number) => {
    setHeights(Array.from({ length: arraySize }, () => getRandomInt(10, 200)));
  };

  useEffect(() => {
    generate(arraySize);
  }, [arraySize]);

  return (
    <div className="app">
      <button onClick={() => generate(arraySize)}>{"Generate"}</button>
      <button onClick={() => SelectionSort(heights, setHeights)}>{"Selection"}</button>
      <Slider text="Array Size" min={3} max={100} value={arraySize} setValue={setArraySize} />
      <Display heights={heights} numElems={arraySize} />
    </div>
  );
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default App;
