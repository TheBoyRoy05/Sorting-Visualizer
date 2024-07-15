import { SortContextType } from "../Utils/Props.ts";

export default async function SelectionSort(context: SortContextType) {
  const { ascending, stats, setStats } = context;
  const { swap, visualize, finalize } = context;
  let { heights } = context;

  const getNext = ascending ? Math.min : Math.max;
  const startTime = Date.now();
  setStats({ comparisons: 0, swaps: 0, time: 0 });
  let { comparisons, time } = stats;
  (comparisons = 0), (time = 0);

  for (let i = 0; i < heights.length; i++) {
    let nextHeight = heights[i];
    let nextIndex = heights.slice(i).indexOf(nextHeight) + i;

    for (let j = i; j < heights.length; j++) {
      comparisons++;
      time = (Date.now() - startTime) / 1000;
      setStats({ ...stats, comparisons, time });

      nextHeight = getNext(nextHeight, heights[j]);
      nextIndex = heights.slice(i).indexOf(nextHeight) + i;
      const status = {
        selected: nextIndex,
        targets: j,
        sorting: i,
      };
      await visualize(heights, status);
    }
    if (i != nextIndex) {
      heights = swap(heights, i, nextIndex);
    }
  }

  time = (Date.now() - startTime) / 1000;
  setStats({ ...stats, comparisons, time });
  await finalize(heights);
}
