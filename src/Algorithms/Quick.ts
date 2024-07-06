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
    pivots.push(pivot);
    // console.log(low, high, pivot, heights);

    if (partition === "Lomuto") {
      heights = swap(heights, pivotIndex, high);
      i = low;

      for (let j = low; j < high; j++) {
        await visualize(() => {
          const pivotIndeces = pivots.map((pivot) => heights.indexOf(pivot));
          setBars(getBars(bars, heights, [i, j], -1, pivotIndeces, high));
        }, interval);

        if (heights[j] <= pivot === ascending) {
          heights = swap(heights, i, j);
          i++;
        }
      }
      heights = swap(heights, i, high);
    } else if (partition === "Hoare") {
      heights = swap(heights, pivotIndex, mid);
      i = low;
      let j = high;

      while (i <= j) {
        while (heights[i] < pivot || heights[j] > pivot) {
          await visualize(() => {
            const pivotIndeces = pivots.map((pivot) => heights.indexOf(pivot));
            setBars(getBars(bars, heights, [low, high], -1, pivotIndeces, mid));
          }, interval);
          if (heights[i] < pivot) i++;
          if (heights[j] > pivot) j--;
        }
        if (i <= j) {
          heights = swap(heights, i, j);
          i++;
          j--;
        }
      }
    }

    pivotIndex = i;

    if (multiThread) {
      await Promise.all([
        sort(low, pivotIndex - 1),
        sort(pivotIndex + 1, high),
      ]);
    } else {
      await sort(low, pivotIndex - 1);
      await sort(pivotIndex + 1, high);
    }
  };

  await sort(0, bars.length - 1);
  finalize(props, heights);
}
