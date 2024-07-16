import { SortContextType } from "../Utils/Props";

export default async function MergeSort(context: SortContextType) {
  const { ascending, multiThread, stats, setStats } = context;
  const { shift, visualize, finalize } = context;
  let { heights } = context;

  let { comparisons, swaps } = stats;
  (comparisons = 0), (swaps = 0);

  const sort = async (start: number, end: number): Promise<void> => {
    if (end - start <= 1) return;
    const mid = Math.ceil((start + end) / 2);

    if (multiThread) {
      await Promise.all([sort(start, mid), sort(mid, end)]);
    } else {
      await sort(start, mid);
      await sort(mid, end);
    }

    let i = 0;
    let j = 0;
    const left = heights.slice(start, mid);
    const right = heights.slice(mid, end);

    while (i < left.length && j < right.length) {
      const status = { targets: [start + i + j, mid + j], sorting: start };
      await visualize(heights, status);

      if (left[i] > right[j] === ascending) {
        heights = shift(heights, start + i + j, mid + j);
        setStats({ swaps: swaps++, comparisons: comparisons++ });
        j++;
      } else {
        i++;
      }

      setStats({ swaps, comparisons: comparisons++ });
    }
  };

  await sort(0, heights.length);
  setStats({ swaps, comparisons });
  await finalize(heights);
}
