import { SortProps } from "../Utils/Props";
import { swap, colorBars, visualize, finalize } from "../Utils/Utils";

export default async function InsertionSort(props: SortProps) {
  const { bars, setBars, interval, ascending } = props;
  let heights = bars.map((bar) => bar.height);

  for (let i = 0; i < heights.length; i++) {
    await visualize(
      () => setBars(colorBars(bars, heights, [i], i + 1)),
      interval
    );

    let j = i;
    while (j > 0 && heights[j] < heights[j - 1] === ascending) {
      await visualize(() => {
        heights = swap(heights, j, j - 1);
        setBars(colorBars(bars, heights, [j - 1], i + 1));
      }, interval);
      j--;
    }
  }

  await finalize(props, heights);
}
