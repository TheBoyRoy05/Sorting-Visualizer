/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import Dashboard from "./Components/Dashboard";
import Display from "./Components/Display";
import InfoCards from "./Components/InfoCards";

const App: FC = () => {
  return (
    <div className="h-full">
      <Dashboard />
      <Display />
      <InfoCards />
    </div>
  );
};

export default App;
