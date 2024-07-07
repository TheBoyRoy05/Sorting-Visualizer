import { SortProps } from "../Utils/Props";
import { finalize, getBars, swap, visualize } from "../Utils/Utils";

export default async function QuickSort(props: SortProps) {
  const { bars, setBars, interval, ascending, multiThread, partition } = props;
  const pivots: number[] = [];
  let heights = bars.map((bar) => bar.height);

  const sort = async (low: number, high: number): Promise<void> => {
    if (high <= low) return;

    const mid = Math.floor((low + high) / 2);
    const pivot = [heights[low], heights[mid], heights[high]].sort(
      (x, y) => x - y
    )[1];
    let pivotIndex = heights.indexOf(pivot);
    let i = pivotIndex;

    if (partition === "Lomuto") {
      heights = swap(heights, pivotIndex, high);
      i = low;

      for (let j = low; j < high; j++) {
        await visualize(() => {
          const oldPivots = pivots.map((pivot) => heights.indexOf(pivot));
          setBars(getBars(bars, heights, [i, j], -1, oldPivots, high));
        }, interval);

        if (heights[j] <= pivot === ascending) {
          heights = swap(heights, i, j);
          i++;
        }
      }
      heights = swap(heights, i, high);
      pivotIndex = i;
    } else if (partition === "Hoare") {
      heights = swap(heights, pivotIndex, mid);
      i = low;
      let j = high;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        await visualize(() => {
          const oldPivots = pivots.map((pivot) => heights.indexOf(pivot));
          pivotIndex = heights.indexOf(pivot);
          setBars(getBars(bars, heights, [i, j], -1, oldPivots, pivotIndex));
        }, interval);

        while (heights[i] < pivot || heights[j] > pivot) {
          if (heights[i] < pivot) i++;
          if (heights[j] > pivot) j--;
          await visualize(() => {
            const oldPivots = pivots.map((pivot) => heights.indexOf(pivot));
            pivotIndex = heights.indexOf(pivot);
            setBars(getBars(bars, heights, [i, j], -1, oldPivots, pivotIndex));
          }, interval);
        }

        if (i >= j) break;

        heights = swap(heights, i, j);
        i++;
        j--;
      }
      pivotIndex = j;
    }
    pivots.push(pivot);

    if (multiThread) {
      await Promise.all([
        sort(low, pivotIndex - Number(partition === "Lomuto")),
        sort(pivotIndex + 1, high),
      ]);
    } else {
      await sort(low, pivotIndex - Number(partition === "Lomuto"));
      await sort(pivotIndex + 1, high);
    }
  };

  await sort(0, bars.length - 1);
  finalize(props, heights);
}
