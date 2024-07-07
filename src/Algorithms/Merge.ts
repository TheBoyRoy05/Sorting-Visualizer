import { SortProps } from "../Utils/Props";
import { finalize, colorBars, shift, visualize } from "../Utils/Utils";

export default async function MergeSort(props: SortProps) {
  const { bars, setBars, interval, ascending, multiThread } = props;
  let heights = bars.map((bar) => bar.height);

  const sort = async (start: number, end: number): Promise<void> => {
    if (end - start <= 1) return;
    const mid = Math.ceil((start + end) / 2);

    if (multiThread) {
      await Promise.all([sort(start, mid), sort(mid, end)]);
    } else {
      await sort(start, mid);
      await sort(mid, end);
    }

    let i = 0;
    let j = 0;
    const left = heights.slice(start, mid);
    const right = heights.slice(mid, end);

    while (i < left.length && j < right.length) {
      await visualize(
        () => setBars(colorBars(bars, heights, [start + i + j, mid + j], start)),
        interval
      );

      if (left[i] > right[j] === ascending) {
        heights = shift(heights, start + i + j, mid + j);
        j++;
      } else {
        i++;
      }
    }
  };

  await sort(0, bars.length);
  await finalize(props, heights);
}
