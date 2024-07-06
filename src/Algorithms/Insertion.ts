import { SortProps } from "../Utils/Props";
import { swap, getBars, visualize, finalize } from "../Utils/Utils";

export default async function InsertionSort(props: SortProps) {
  const { bars, setBars, interval, ascending } = props;
  let heights = bars.map((bar) => bar.height);

  for (let i = 0; i < heights.length; i++) {
    if (i > 0 && heights[i] < heights[i - 1] === ascending) {
      let j = i;
      while (j > 0 && heights[j] < heights[j - 1] === ascending) {
        await visualize(() => {
          setBars(getBars(bars, heights, [j], i + 1));
          heights = swap(heights, j, j - 1);
        }, interval);
        j--;
      }
    } else {
      await visualize(() => setBars(getBars(bars, heights, [i], i + 1)), interval);
    }
  }

  finalize(props, heights);
}
