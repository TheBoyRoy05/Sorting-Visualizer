import { useSortContext } from "../Utils/SortContext";

export default async function BubbleSort() {
  const { bars, ascending, swap, visualize, finalize } = useSortContext();
  const breakEarly = true;
  let heights = bars.map((bar) => bar.height);

  for (let i = 1; i <= heights.length; i++) {
    let swapped = false;
    await visualize(heights, { targets: heights.length - 1, sorting: i - 1 });
    for (let j = heights.length - 1; j >= i; j--) {
      if (heights[j] < heights[j - 1] === ascending) {
        heights = swap(heights, j, j - 1);
        swapped = true;
      }
      await visualize(heights, { targets: j - 1, sorting: i - 1 });
    }
    if (!swapped && breakEarly) break;
  }

  await finalize(heights);
}
