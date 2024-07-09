import { SortContextType } from "../Utils/Props";

export default async function QuickSort(context: SortContextType) {
  const { bars, ascending, multiThread, partition, swap, visualize, finalize } =
    context;
  let heights = bars.map((bar) => bar.height);
  const pivots: number[] = [];

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

    for (let j = low; j < high; j++) {
      await visualizeStep(i, j, high);
      if (ascending ? heights[j] <= pivot : heights[j] >= pivot) {
        heights = swap(heights, i, j);
        i++;
      }
    }
    heights = swap(heights, i, high);
    return i;
  };

  const hoarePartition = async (low: number, high: number, pivot: number) => {
    const mid = Math.floor((low + high) / 2);
    heights = swap(heights, heights.indexOf(pivot), mid);
    let i = low;
    let j = high;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const pivotIndex = heights.indexOf(pivot);
      await visualizeStep(i, j, pivotIndex);

      while (ascending ? heights[i] < pivot : heights[i] > pivot) {
        i++;
        await visualizeStep(i, j, pivotIndex);
      }

      while (ascending ? heights[j] > pivot : heights[j] < pivot) {
        j--;
        await visualizeStep(i, j, pivotIndex);
      }

      if (i >= j) return j;
      heights = swap(heights, i, j);
      i++;
      j--;
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

  await sort(0, bars.length - 1);
  finalize(heights);
}
