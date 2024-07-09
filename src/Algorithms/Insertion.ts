import { SortContextType } from "../Utils/Props";

export default async function InsertionSort(context: SortContextType) {
  const { ascending, stats, setStats } = context;
  const { swap, visualize, finalize} = context;
  let { heights } = context;

  const startTime = Date.now();
  let { comparisons, time } = stats;
  (comparisons = 0), (time = 0);

  for (let i = 0; i < heights.length; i++) {
    await visualize(heights, { targets: i, sorting: i + 1 });

    let j = i;
    if (j > 0) comparisons++;
    while (j > 0 && heights[j] < heights[j - 1] === ascending) {
      j--;
      heights = swap(heights, j, j + 1);
      await visualize(heights, { targets: j, sorting: i + 1 });

      comparisons++;
      time = (Date.now() - startTime) / 1000;
      setStats({ ...stats, comparisons, time });
    }
  }

  time = (Date.now() - startTime) / 1000;
  setStats({ ...stats, comparisons, time });
  await finalize(heights);
}
