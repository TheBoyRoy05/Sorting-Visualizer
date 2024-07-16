import { SortContextType } from "../Utils/Props";
import { getRandomInt } from "../Utils/AppUtils";

export default async function BozoSort(context: SortContextType) {
  const { ascending, checkAnim, stats, setStats, swap, visualize } = context;
  let { heights } = context;

  let { comparisons, swaps } = stats;
  (comparisons = 0), (swaps = 0);

  const checkSorted = async (heights: number[]) => {
    for (let i = 0; i < heights.length; i++) {
      if (checkAnim) {
        await visualize(heights, { selected: i, sorting: i });
      }
      const wrongOrder = heights[i] < heights[i - 1] == ascending;
      setStats({ swaps, comparisons: comparisons++ });
      if (i != 0 && heights[i] != heights[i - 1] && wrongOrder) {
        await visualize(heights, { targets: [i, i - 1], sorting: i });
        return false;
      }
    }
    return true;
  };

  while (!(await checkSorted(heights))) {
    const bar1Idx = getRandomInt(0, heights.length);
    const bar2Idx = getRandomInt(0, heights.length);
    await visualize(heights, { targets: [bar1Idx, bar2Idx] });
    heights = swap(heights, bar1Idx, bar2Idx);
    setStats({ swaps: swaps++, comparisons });
  }

  setStats({ swaps, comparisons });
  await visualize(heights, { sorted: heights.length });
}
