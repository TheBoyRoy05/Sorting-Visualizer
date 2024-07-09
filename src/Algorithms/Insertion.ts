import { SortContextType } from "../Utils/Props";

export default async function InsertionSort(context: SortContextType) {
  const { bars, ascending, swap, visualize, finalize } = context;
  let heights = bars.map((bar) => bar.height);

  for (let i = 0; i < heights.length; i++) {
    await visualize(heights, { targets: i, sorting: i + 1 });

    let j = i;
    while (j > 0 && heights[j] < heights[j - 1] === ascending) {
      j--;
      heights = swap(heights, j, j + 1);
      await visualize(heights, { targets: j, sorting: i + 1 });
    }
  }

  await finalize(heights);
}
