import { SortContextType } from "../Utils/Props";

export default async function InsertionSort(context: SortContextType) {
  const { ascending, stats, setStats } = context;
  const { swap, visualize, finalize } = context;
  let { heights } = context;

  let { comparisons, swaps } = stats;
  (comparisons = 0), (swaps = 0);

  for (let i = 0; i < heights.length; i++) {
    await visualize(heights, { targets: i, sorting: i + 1 });

    let j = i;
    if (j > 0) setStats({ swaps, comparisons: comparisons++ });
    while (j > 0 && heights[j] < heights[j - 1] === ascending) {
      j--;
      heights = swap(heights, j, j + 1);
      await visualize(heights, { targets: j, sorting: i + 1 });
      setStats({ swaps: swaps++, comparisons: comparisons++ });
    }
  }

  setStats({ swaps, comparisons });
  await finalize(heights);
}
