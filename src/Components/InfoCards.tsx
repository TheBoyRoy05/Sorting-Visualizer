import { FC } from "react";
import { useSortContext } from "../Utils/SortContext";
import { capitalize } from "../Utils/AppUtils";
import sortInfo from "../Data/SortInfo.json";
import "../Styles/infoCards.css";

const InfoCards: FC = () => {
  const { sort, stats, elapsedTime } = useSortContext();

  const liveStats = (
    <div className="live-stats card">
      <h3 className="card-title">{"Live Statistics"}</h3>
      <div className="hbar" />
      <div className="card-content stats">
        <div className="mini-card">
          <b>{"Comparisons"}</b>
          <p className="stat">{stats.comparisons}</p>
        </div>
        <div className="mini-card">
          <b>{"Swaps"}</b>
          <p className="stat">{stats.swaps}</p>
        </div>
        <div className="mini-card">
          <b>{"Time"}</b>
          <p className="stat">{(elapsedTime/1000).toFixed(3) + " secs"}</p>
        </div>
      </div>
    </div>
  );

  const description = (
    <div className="description-card card">
      <h3 className="card-title">{capitalize(sort) + " Sort"}</h3>
      <div className="hbar" />
      <div className="card-content">
        <div className="mini-card">
          <p className="description">{sortInfo[sort].description}</p>
        </div>
        <div className="mini-card">
          <p className="read-more">
            {"Read more about "}
            <a href={sortInfo[sort].link}>{capitalize(sort) + " Sort"}</a>
          </p>
        </div>
      </div>
    </div>
  );

  const sortStats = (
    <div className="sort-stats card">
      <h3 className="card-title">{"Sort Statistics"}</h3>
      <div className="hbar" />
      <div className="card-content">
        <div className="time-complexity-container mini-card">
          <h4>{"Time Complexity"}</h4>
          <div className="time-complexity">
            <div className="best-time">
              <b>{"Best"}</b>
              <p>{sortInfo[sort].bestTime}</p>
            </div>
            <div className="average-time">
              <b>{"Average"}</b>
              <p>{sortInfo[sort].averageTime}</p>
            </div>
            <div className="worst-time">
              <b>{"Worst"}</b>
              <p>{sortInfo[sort].worstTime}</p>
            </div>
          </div>
        </div>
        <div className="space-stable mini-card">
          <p className="space-complexity">
            <b>{"Space: "}</b>
            {sortInfo[sort].space}
          </p>
          <p className="stable">
            <b>{"Stable: "}</b>
            {sortInfo[sort].stable}
          </p>
        </div>
        <div className="mini-card">
          <p className="read-more">
            {"Read more about "}
            <a href={"https://www.programiz.com/dsa/asymptotic-notations"}>
              {"Asymptotic Notation"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cards-container">
      {liveStats}
      {description}
      {sortStats}
    </div>
  );
};

export default InfoCards;
