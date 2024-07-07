import { SortProps } from "../Utils/Props.ts";
import { swap, colorBars, visualize, finalize } from "../Utils/Utils.ts";

export default async function SelectionSort(props: SortProps) {
  const { bars, setBars, interval, ascending } = props;
  let heights = bars.map((bar) => bar.height);

  for (let i = 0; i < heights.length; i++) {
    const getNext = ascending ? Math.min : Math.max;
    let nextHeight = heights[i];

    for (let j = i; j < heights.length; j++) {
      const nextIndex = heights.slice(i).indexOf(nextHeight) + i;
      await visualize(() => {
        nextHeight = getNext(nextHeight, heights[j]);
        setBars(colorBars(bars, heights, [nextIndex, j], i));
      }, interval);
    }

    heights = swap(heights, i, heights.slice(i).indexOf(nextHeight) + i);
  }

  await finalize(props, heights);
}
