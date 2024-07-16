/* eslint-disable no-constant-condition */
import { SortContextType } from "../Utils/Props";

export default async function QuickSort(context: SortContextType) {
  const { ascending, multiThread, partition, stats, setStats } = context;
  const { swap, visualize, finalize } = context;
  let { heights } = context;

  const pivots: number[] = [];
  let { comparisons, swaps } = stats;
  (comparisons = 0), (swaps = 0);

  const medianOfThree = (low: number, mid: number, high: number) =>
    [heights[low], heights[mid], heights[high]].sort((x, y) => x - y)[1];

  const visualizeStep = async (i: number, j: number, pivotIndex: number) => {
    const oldPivots = pivots.map((pivot) => heights.indexOf(pivot));
    const status = {
      targets: [i, j],
      sorting: oldPivots,
      selected: pivotIndex,
    };
    await visualize(heights, status);
  };

  const lomutoPartition = async (low: number, high: number, pivot: number) => {
    let i = low;
    heights = swap(heights, heights.indexOf(pivot), high);
    setStats({ swaps: swaps++, comparisons });

    for (let j = low; j < high; j++) {
      await visualizeStep(i, j, high);
      if (ascending ? heights[j] <= pivot : heights[j] >= pivot) {
        heights = swap(heights, i, j);
        setStats({ swaps: swaps++, comparisons });
        i++;
      }
      setStats({ swaps, comparisons: comparisons++ });
    }

    heights = swap(heights, i, high);
    setStats({ swaps: swaps++, comparisons });
    return i;
  };

  const hoarePartition = async (low: number, high: number, pivot: number) => {
    const mid = Math.floor((low + high) / 2);
    heights = swap(heights, heights.indexOf(pivot), mid);
    setStats({ swaps: swaps++, comparisons });
    let i = low - 1;
    let j = high + 1;

    while (true) {
      const pivotIndex = heights.indexOf(pivot);
      await visualizeStep(i, j, pivotIndex);

      do {
        i++;
        setStats({ swaps, comparisons: comparisons++ });
        await visualizeStep(i, j, pivotIndex);
      } while (
        i <= high && ascending ? heights[i] < pivot : heights[i] > pivot
      );

      do {
        j--;
        setStats({ swaps, comparisons: comparisons++ });
        await visualizeStep(i, j, pivotIndex);
      } while (j >= low && ascending ? heights[j] > pivot : heights[j] < pivot);

      if (i >= j) return j;
      heights = swap(heights, i, j);
      setStats({ swaps: swaps++, comparisons });
    }
  };

  const sort = async (low: number, high: number): Promise<void> => {
    if (high <= low) return;

    const mid = Math.floor((low + high) / 2);
    const pivot = medianOfThree(low, mid, high);
    pivots.push(pivot);

    const pivotIndex =
      partition === "Lomuto"
        ? await lomutoPartition(low, high, pivot)
        : await hoarePartition(low, high, pivot);

    const leftHigh = pivotIndex - Number(partition === "Lomuto");

    if (multiThread) {
      await Promise.all([sort(low, leftHigh), sort(pivotIndex + 1, high)]);
    } else {
      await sort(low, leftHigh);
      await sort(pivotIndex + 1, high);
    }
  };

  await sort(0, heights.length - 1);
  setStats({ swaps, comparisons });
  finalize(heights);
}
