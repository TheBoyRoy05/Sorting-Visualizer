import { SortContextType } from "../Utils/Props";
import { getRandomInt, swap } from "../Utils/SortUtils";

export default async function BozoSort(context: SortContextType) {
  let { heights } = context;
  const { checkSorted, visualize } = context;

  while (!(await checkSorted(heights, false))) {
    const bar1Idx = getRandomInt(0, heights.length);
    const bar2Idx = getRandomInt(0, heights.length);
    await visualize(heights, { targets: [bar1Idx, bar2Idx] });
    heights = swap(heights, bar1Idx, bar2Idx);
  }

  await visualize(heights, { sorted: heights.length });
}
