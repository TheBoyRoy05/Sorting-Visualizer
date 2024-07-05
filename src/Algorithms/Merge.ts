import { getBars, setAllSorted, shift, SortProps } from "./Utils";

export default async function MergeSort(props: SortProps) {
  const { bars, setBars, interval, ascending } = props;
  let heights = bars.map((bar) => bar.height);

  const sort = async (start: number, end: number): Promise<void> => {
    if (end - start <= 1) return;

    const mid = Math.ceil((start + end) / 2);
    await sort(start, mid);
    await sort(mid, end);

    let i = 0, j = 0;
    const left = heights.slice(start, mid);
    const right = heights.slice(mid, end);

    while (i < left.length && j < right.length) {
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          setBars(getBars(bars, heights, [start + i + j, mid + j], start));
          resolve();
        }, interval)
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
  setBars(setAllSorted(getBars(bars, heights, [], -1)));
}
