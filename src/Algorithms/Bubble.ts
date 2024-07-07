import { SortProps } from "../Utils/Props";
import { swap, colorBars, visualize, finalize } from "../Utils/Utils";

export default async function BubbleSort(props: SortProps) {
  const { bars, setBars, interval, ascending } = props;
  let heights = bars.map((bar) => bar.height);

  for (let i = 1; i < heights.length; i++) {
    for (let j = heights.length - 1; j >= i; j--) {
      await visualize(() => {
        setBars(colorBars(bars, heights, [j, j - 1], i - 1));
        if (heights[j] < heights[j - 1] === ascending) {
          heights = swap(heights, j, j - 1);
        }
      }, interval);
    }
  }
  
  await finalize(props, heights);
}
