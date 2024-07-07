import { SortProps } from "../Utils/Props";
import { finalize, swap, visualize, shift } from "../Utils/Utils";

export default async function HeapSort(props: SortProps) {
  const { bars, ascending } = props;
  let heights = bars.map((bar) => bar.height);
  const degree = 2;

  const heapify = async () => {
    const parent = (index: number) =>
      index == 0 ? -1 : Math.floor((index - 1) / degree);

    const bubbleUp = async (index: number) => {
      await visualize(heights, props, { targets: [index] });
      if (parent(index) < 0) return;
      if (heights[index] < heights[parent(index)] === ascending) {
        heights = swap(heights, index, parent(index));
        await bubbleUp(parent(index));
      }
    };

    for (let i = 0; i < heights.length; i++) {
      await bubbleUp(i);
    }
  };

  const sort = async () => {
    const trickleDown = async (heapStart: number, index: number) => {
      let nextIdx = index;
      const start = heapStart + degree * (index - heapStart) + 1;
      const end = start + degree;

      for (let j = start; j < end; j++) {
        if (j >= heights.length) break;
        const status = {
          targets: index,
          selected: j,
          sorting: heapStart,
        };
        await visualize(heights, props, status);
        if (heights[j] < heights[nextIdx] === ascending) nextIdx = j;
      }

      if (nextIdx === index) return;
      const status = {
        targets: [nextIdx, index],
        sorting: heapStart,
      };
      heights = swap(heights, nextIdx, index);
      await visualize(heights, props, status);
      await trickleDown(heapStart, nextIdx);
    };

    for (let i = 1; i < heights.length; i++) {
      const status = { targets: heights.length - 1, sorting: i };
      await visualize(heights, props, status);

      heights = shift(heights, i, heights.length - 1);
      await trickleDown(i, i);
    }
  };

  await heapify();
  await sort();
  await finalize(props, heights);
}
