import { SortContextType } from "../Utils/Props";
import { getRandomInt } from "../Utils/AppUtils";

export default async function BozoSort(context: SortContextType) {
  const { stats, setStats, swap, checkSorted, visualize } = context;
  let { heights } = context;

  const startTime = Date.now();

  while (!(await checkSorted(heights, false))) {
    const bar1Idx = getRandomInt(0, heights.length);
    const bar2Idx = getRandomInt(0, heights.length);
    await visualize(heights, { targets: [bar1Idx, bar2Idx] });
    heights = swap(heights, bar1Idx, bar2Idx);
    setStats({ ...stats, time: (Date.now() - startTime) / 1000 });
  }

  setStats({ ...stats, time: (Date.now() - startTime) / 1000 });
  await visualize(heights, { sorted: heights.length });
}
