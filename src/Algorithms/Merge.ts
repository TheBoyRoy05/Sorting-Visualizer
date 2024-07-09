import { SortContextType } from "../Utils/Props";
import { shift } from "../Utils/SortUtils";

export default async function MergeSort(context: SortContextType) {
  let { heights } = context;
  const { ascending, multiThread, visualize, finalize } = context;

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
      const status = { targets: [start + i + j, mid + j], sorting: start };
      await visualize(heights, status);

      if (left[i] > right[j] === ascending) {
        heights = shift(heights, start + i + j, mid + j);
        j++;
      } else {
        i++;
      }
    }
  };

  await sort(0, heights.length);
  await finalize(heights);
}
