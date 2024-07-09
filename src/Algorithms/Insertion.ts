import { SortContextType } from "../Utils/Props";
import { swap } from "../Utils/SortUtils";

export default async function InsertionSort(context: SortContextType) {
  let { heights } = context;
  const { ascending, visualize, finalize } = context;

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
