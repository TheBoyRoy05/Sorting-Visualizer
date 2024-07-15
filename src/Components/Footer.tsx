import { FC } from "react";
import { useSortContext } from "../Utils/SortContext";
import { capitalize } from "../Utils/AppUtils";

const Footer: FC = () => {
  const { sort, stats } = useSortContext();

  return (
    <div className="footer">
      <div className="description-container">
        <h3 className="description-title">{capitalize(sort) + " Sort"}</h3>
        <p className="description">{}</p>
      </div>
      <div className="live-stats">
        <p className="stats-text">{`Statistics: ${stats.comparisons} Comparisons, ${stats.swaps} Swaps, ${stats.time} Sec`}</p>
      </div>
    </div>
  );
};

export default Footer;
