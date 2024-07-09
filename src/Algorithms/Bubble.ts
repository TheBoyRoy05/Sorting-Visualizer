import { SortContextType } from "../Utils/Props";

export default async function BubbleSort(context: SortContextType) {
  const { ascending, stats, setStats } = context;
  const {swap, visualize, finalize } = context;
  let { heights } = context;

  const breakEarly = true;
  const startTime = Date.now();
  let { comparisons, time } = stats;
  (comparisons = 0), (time = 0);

  for (let i = 1; i <= heights.length; i++) {
    let swapped = false;
    await visualize(heights, { targets: heights.length - 1, sorting: i - 1 });

    for (let j = heights.length - 1; j >= i; j--) {
      if (heights[j] < heights[j - 1] === ascending) {
        heights = swap(heights, j, j - 1);
        swapped = true;
      }
      await visualize(heights, { targets: j - 1, sorting: i - 1 });

      comparisons++;
      time = (Date.now() - startTime) / 1000;
      setStats({ ...stats, comparisons, time });
    }

    if (!swapped && breakEarly) break;
  }

  time = (Date.now() - startTime) / 1000;
  setStats({ ...stats, comparisons, time });
  await finalize(heights);
}
