import { FC } from "react";

export interface BarProps {
  width: number;
  height: number;
  status: "unsorted" | "targeted" | "sorting" | "sorted";
}

const Bar: FC<BarProps> = ({ width, height, status }) => {
  const style = {
    height: `${height}px`,
    width: `${width}px`,
  };
  return (
    <div className={"bar " + status} style={style}>
      <p className="bar-text">{width > 30 ? height : ""}</p>
    </div>
  );
};

interface DisplayProps {
  bars: BarProps[];
}

const Display: FC<DisplayProps> = ({ bars }) => {
  return (
    <div className="display">
      {bars.map((bar, index) => (
        <Bar key={index} {...bar} />
      ))}
    </div>
  );
};

export default Display;
