import { FC } from "react";
import { useSortContext } from "../Utils/SortContext";
import { capitalize } from "../Utils/AppUtils";
import sortInfo from "../Data/SortInfo.json"
import "../Styles/infoCards.css"

const InfoCards: FC = () => {
  const { sort, stats } = useSortContext();

  return (
    <div className="cards-container">
      <div className="live-stats-card">
        <h3 className="card-title">{"Live Statistics"}</h3>
        <p className="comparisons">{"Comparisons: " + stats.comparisons}</p>
        <p className="swaps">{"Swaps: " + stats.swaps}</p>
        <p className="time">{"Time: " + stats.time}</p>
      </div>
      <div className="description-card">
        <h3 className="card-title">{capitalize(sort) + " Sort"}</h3>
        <p className="description">{sortInfo[sort].description}</p>
      </div>
      <div className="sort-stats-card">
        <h3 className="card-title">{"Sort Statistics"}</h3>
        <h4>{"Time Complexity: "}</h4>
        <div className="time-complexity">
          <p><b>{"Best: "}</b>{sortInfo[sort].bestTime}</p>
          <p><b>{"Average: "}</b>{sortInfo[sort].averageTime}</p>
          <p><b>{"Worst: "}</b>{sortInfo[sort].wortTime}</p>
        </div>
        <p><b>{"Space Complexity: "}</b>{sortInfo[sort].space}</p>
        <p><b>{"Stable: "}</b>{sortInfo[sort].stable}</p>
        </div>
    </div>
  );
};

export default InfoCards;
