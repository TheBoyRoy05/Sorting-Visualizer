import { SortProps } from "../Utils/Props";
import { getBars, setAllSorted, swap } from "../Utils/Utils";

export default async function QuickSort(props: SortProps) {
  const { bars, setBars, interval, ascending, multiThread, partition } = props;
  let heights = bars.map((bar) => bar.height);

  const sort = async (low: number, high: number): Promise<void> => {
    const mid = Math.floor((low + high) / 2);
    const pivot = [heights[low], heights[mid], heights[high]].sort(
      (x, y) => x - y
    )[1];
    let pivotIndex = heights.indexOf(pivot);
    let i = pivotIndex;
    console.log(pivot)

    if (partition === "Lomuto") {
      heights = swap(heights, pivotIndex, high);
      i = low;
      for (let j = low; j < high; j++) {
        if (heights[j] <= pivot === ascending) {
          heights = swap(heights, i, j);
          i++;
        }
      }
      heights = swap(heights, i, high);
    } else if (partition === "Hoare") {
      let j = high;
      i = low;

      while (i <= j) {
        while (heights[i] < pivot) i++;
        while (heights[j] > pivot) j--;
        if (i <= j) {
          heights = swap(heights, i, j);
          i++;
          j--;
        }
      }
    }

    pivotIndex = i;

    // if (multiThread) {
    //   await Promise.all([sort(low, pivotIndex), sort(pivotIndex + 1, high)]);
    // } else {
    //   await sort(low, pivotIndex);
    //   await sort(pivotIndex + 1, high);
    // }
  };

  await sort(0, bars.length - 1);
  setBars(setAllSorted(getBars(bars, heights, [], -1)));
}
