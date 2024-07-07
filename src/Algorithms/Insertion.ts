import { SortProps } from "../Utils/Props";
import { swap, visualize, finalize } from "../Utils/Utils";

export default async function InsertionSort(props: SortProps) {
  const { bars, ascending } = props;
  let heights = bars.map((bar) => bar.height);

  for (let i = 0; i < heights.length; i++) {
    await visualize(heights, props, { targets: i, sorting: i + 1 });

    let j = i;
    while (j > 0 && heights[j] < heights[j - 1] === ascending) {
      j--;
      heights = swap(heights, j, j + 1);
      await visualize(heights, props, { targets: j, sorting: i + 1 });
    }
  }

  await finalize(props, heights);
}
