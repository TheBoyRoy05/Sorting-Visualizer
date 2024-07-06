import { FC } from "react";
import { BarProps, DisplayProps } from "../Utils/Props";

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
