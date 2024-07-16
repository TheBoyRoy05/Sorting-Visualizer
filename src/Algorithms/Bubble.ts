import { SortContextType } from "../Utils/Props";

export default async function BubbleSort(context: SortContextType) {
  const { ascending, stats, setStats } = context;
  const { swap, visualize, finalize } = context;
  let { heights } = context;

  const breakEarly = true;
  let { comparisons, swaps } = stats;
  (comparisons = 0), (swaps = 0);

  for (let i = 1; i <= heights.length; i++) {
    let swapped = false;
    await visualize(heights, { targets: heights.length - 1, sorting: i - 1 });

    for (let j = heights.length - 1; j >= i; j--) {
      if (heights[j] < heights[j - 1] === ascending) {
        heights = swap(heights, j, j - 1);
        setStats({ swaps: swaps++, comparisons });
        swapped = true;
      }
      await visualize(heights, { targets: j - 1, sorting: i - 1 });
      setStats({ swaps, comparisons: comparisons++ });
    }

    if (!swapped && breakEarly) break;
  }

  setStats({ swaps, comparisons });
  await finalize(heights);
}
