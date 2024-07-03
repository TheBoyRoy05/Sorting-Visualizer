import { FC, useEffect, useState } from "react";

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
      <p className="bar-text">{width > 20 ? height : ""}</p>
    </div>
  );
};

interface DisplayProps {
  heights: number[];
}

const Display: FC<DisplayProps> = ({ heights }) => {
  return (
    <div className="display">
      {heights.map((height, index) => (
        <Bar key={index} width={21} height={height} index={index.toString()} />
      ))}
    </div>
  );
};

interface CustomButtonProps {
  text: string;
  handleClick: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App: FC = () => {
  const [numElems, setNumElems] = useState(10);
  const [heights, setHeights] = useState<number[]>([]);

  const generate = (numElems: number) => {
    setHeights(Array.from({ length: numElems }, () => getRandomInt(1, 100)));
  };

  useEffect(() => {
    generate(numElems);
  }, [numElems]);

  return (
    <div className="app">
      <CustomButton text="Generate" handleClick={() => generate(numElems)} />
      <div className="slider">
        <input
          type="range"
          onChange={(e) => setNumElems(Number(e.target.value))}
          min="2"
          max="100"
          step="1"
          value={numElems}
        />
        <p className="slider-value">{numElems}</p>
      </div>
      <Display heights={heights} />
    </div>
  );
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default App;
