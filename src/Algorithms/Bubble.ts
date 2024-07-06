import { SortProps } from "../Utils/Props";
import { swap, getBars, visualize, finalize } from "../Utils/Utils";

export default async function BubbleSort(props: SortProps) {
  const { bars, setBars, interval, ascending } = props;
  let heights = bars.map((bar) => bar.height);

  for (let i = 1; i < heights.length; i++) {
    for (let j = heights.length - 1; j >= i; j--) {
      await visualize(() => {
        setBars(getBars(bars, heights, [j, j - 1], i - 1));
        if (heights[j] < heights[j - 1] === ascending) {
          heights = swap(heights, j, j - 1);
        }
      }, interval);
    }
  }
  
  finalize(props, heights);
}
