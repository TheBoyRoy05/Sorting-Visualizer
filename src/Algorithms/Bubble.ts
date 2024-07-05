import { swap, getBars, setAllSorted, SortProps } from "./Utils";

export default async function BubbleSort(props: SortProps) {
  const { setBars, interval, ascending } = props;
  let { bars } = props;
  let heights = bars.map((bar) => bar.height);

  for (let i = 1; i < heights.length; i++) {
    for (let j = heights.length - 1; j >= i; j--) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
					bars = getBars(bars, heights, [j, j - 1], i - 1);
          setBars(bars);
					if (heights[j] < heights[j - 1] === ascending) {
						heights = swap(heights, j, j - 1);
					}
          resolve();
        }, interval);
      });
    }
  }

  setBars(setAllSorted(bars));
}
