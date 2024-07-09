import { SortContextType } from "../Utils/Props";

export default async function BozoSort(context: SortContextType) {
  const { bars, swap, checkSorted, visualize } = context;
  let heights = bars.map(bar => bar.height);

  while (!(await checkSorted(heights, false))) {
    const bar1Idx = Math.floor(Math.random() * bars.length);
    const bar2Idx = Math.floor(Math.random() * bars.length);
    await visualize(heights, {targets: [bar1Idx, bar2Idx]});
    heights = swap(heights, bar1Idx, bar2Idx);
  }

  await visualize(heights, {sorted: bars.length});
}