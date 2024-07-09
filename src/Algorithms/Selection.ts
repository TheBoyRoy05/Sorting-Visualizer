import { SortContextType } from "../Utils/Props.ts";
import { swap } from "../Utils/SortUtils.ts";

export default async function SelectionSort(context: SortContextType) {
  let { heights } = context;
  const { ascending, visualize, finalize } = context;
  const getNext = ascending ? Math.min : Math.max;

  for (let i = 0; i < heights.length; i++) {
    let nextHeight = heights[i];
    let nextIndex = heights.slice(i).indexOf(nextHeight) + i;

    for (let j = i; j < heights.length; j++) {
      nextHeight = getNext(nextHeight, heights[j]);
      nextIndex = heights.slice(i).indexOf(nextHeight) + i;
      const status = {
        selected: nextIndex,
        targets: j,
        sorting: i,
      };
      await visualize(heights, status);
    }

    heights = swap(heights, i, nextIndex);
  }

  await finalize(heights);
}
