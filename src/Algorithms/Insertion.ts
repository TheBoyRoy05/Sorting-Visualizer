import { SortProps } from "../Utils/Props";
import { swap, getBars, setAllSorted } from "../Utils/Utils";

export default async function InsertionSort(props: SortProps) {
  const { setBars, interval, ascending } = props;
  let { bars } = props;
  let heights = bars.map((bar) => bar.height);

  for (let i = 1; i < heights.length; i++) {
    let j = i;
    while (j > 0 && ascending === heights[j] < heights[j - 1]) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          bars = getBars(bars, heights, [j], i + 1);
          setBars(bars);
          heights = swap(heights, j, j - 1);
          resolve();
        }, interval);
      });

      j--;
    }
  }

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      bars = getBars(bars, heights, [], heights.length - 1);
      setBars(bars);
      resolve();
    }, interval);
  });

  setBars(setAllSorted(bars));
}
