import { SortProps } from "../Utils/Props.ts";
import { swap, visualize, finalize } from "../Utils/Utils.ts";

export default async function SelectionSort(props: SortProps) {
  const { bars, ascending } = props;
  const getNext = ascending ? Math.min : Math.max;
  let heights = bars.map((bar) => bar.height);

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
      await visualize(heights, props, status);
    }

    heights = swap(heights, i, nextIndex);
  }

  await finalize(props, heights);
}
