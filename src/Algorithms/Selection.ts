import { SortContextType } from "../Utils/Props.ts";

export default async function SelectionSort(context: SortContextType) {
  const { ascending, stats, setStats } = context;
  const { swap, visualize, finalize } = context;
  let { heights } = context;

  const getNext = ascending ? Math.min : Math.max;
  let { comparisons, swaps } = stats;
  (comparisons = 0), (swaps = 0);

  for (let i = 0; i < heights.length; i++) {
    let nextHeight = heights[i];
    let nextIndex = heights.slice(i).indexOf(nextHeight) + i;

    for (let j = i; j < heights.length; j++) {
      setStats({ swaps, comparisons: comparisons++ });

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
      setStats({ swaps: swaps++, comparisons });
    }
  }

  setStats({ swaps, comparisons });
  await finalize(heights);
}
