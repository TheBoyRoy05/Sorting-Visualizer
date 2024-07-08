import { FC } from "react";
import { BarProps } from "../Utils/Props";
import { useSortContext } from "../Utils/SortContext";

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

const Display: FC = () => {
  const { bars } = useSortContext();
  return (
    <div className="display">
      {bars.map((bar, index) => (
        <Bar key={index} {...bar} />
      ))}
    </div>
  );
};

export default Display;
