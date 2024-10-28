import { FC } from "react";
import { useSortContext } from "../Utils/SortContext";
import { capitalize } from "../Utils/AppUtils";
import sortInfo from "../Data/SortInfo.json";
import Card from "./Card";

const InfoCards: FC = () => {
  const { sort, stats, elapsedTime } = useSortContext();
  const miniCard =
    "w-full bg-slate-700 rounded-lg p-4 text-center text-white border border-slate-500";

  return (
    <div className="flex gap-4 px-6">
      <Card title="Live Statistics">
        <div className={miniCard}>
          <b className="text-lg">{"Comparisons"}</b>
          <p className="text-2xl font-bold">{stats.comparisons}</p>
        </div>
        <div className={miniCard}>
          <b className="text-lg">{"Swaps"}</b>
          <p className="text-2xl font-bold">{stats.swaps}</p>
        </div>
        <div className={miniCard}>
          <b className="text-lg">{"Time"}</b>
          <p className="text-2xl font-bold">{(elapsedTime / 1000).toFixed(3) + " secs"}</p>
        </div>
      </Card>

      <Card title={capitalize(sort) + " Sort"} customClass="flex-2">
        <div className={miniCard}>
          <p className="text-left indent-6">{sortInfo[sort].description}</p>
        </div>
        <div className={miniCard}>
          <p className="">
            {"Read more about "}
            <a href={sortInfo[sort].link} target="_blank" className="underline">
              {capitalize(sort) + " Sort"}
            </a>
          </p>
        </div>
      </Card>

      <Card title="Sort Statistics">
        <div className={miniCard + " flex-col"}>
          <h4 className="text-white text-lg font-bold">{"Time Complexity"}</h4>
          <div className="border-b border-slate-300 mb-2" />
          <div className="flex justify-around">
            <div className="best-time">
              <b>{"Best"}</b>
              <p className="text-white">{sortInfo[sort].bestTime}</p>
            </div>
            <div className="average-time">
              <b>{"Average"}</b>
              <p className="text-white">{sortInfo[sort].averageTime}</p>
            </div>
            <div className="worst-time">
              <b>{"Worst"}</b>
              <p className="text-white">{sortInfo[sort].worstTime}</p>
            </div>
          </div>
        </div>
        <div className={miniCard + " flex justify-around"}>
          <div className="space-complexity">
            <b>{"Space: "}</b>
            <p className="text-white">{sortInfo[sort].space}</p>
          </div>
          <div className="stable">
            <b>{"Stable: "}</b>
            <p className="text-white">{sortInfo[sort].stable}</p>
          </div>
        </div>
        <div className={miniCard}>
          <p className="read-more">
            {"Read more about "}
            <a
              href={"https://www.programiz.com/dsa/asymptotic-notations"}
              target="_blank"
              className="underline"
            >
              {"Asymptotic Notation"}
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default InfoCards;
