import { FC } from "react";


interface BarProps {
  height: number;
  index: string;
}

const Bar: FC<BarProps> = ({ height, index }) => {
  return (
    <div className="bar" id={index} style={{ height: `${height}px` }}>
      {height < 100 ? height : ""}
    </div>
  );
};

const App: FC = () => {
  return (
    <div className="app">
      <Bar height={20} index={"0"} />
    </div>
  );
};

export default App;
