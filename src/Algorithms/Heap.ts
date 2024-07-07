import { SortProps } from "../Utils/Props";
import { finalize, colorBars, swap, visualize, shift } from "../Utils/Utils";

export default async function HeapSort(props: SortProps) {
  const { bars, setBars, interval, ascending } = props;
  let heights = bars.map((bar) => bar.height);
  const degree = 2;

  const heapify = async () => {
    const parent = (index: number) =>
      index == 0 ? -1 : Math.floor((index - 1) / degree);

    const bubbleUp = async (index: number) => {
      await visualize(
        () => setBars(colorBars(bars, heights, [index])),
        interval
      );
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
      const start = Math.min(
        heights.length,
        heapStart + degree * (index - heapStart) + 1
      );
      const end = Math.min(heights.length, start + degree);
      for (let i = start; i < end; i++) {
        await visualize(
          () => setBars(colorBars(bars, heights, [nextIdx, i])),
          interval
        );
        if (heights[i] < heights[nextIdx] === ascending) nextIdx = i;
      }

      if (nextIdx === index) return;
      heights = swap(heights, nextIdx, index);
      await trickleDown(heapStart, nextIdx);
    };

    for (let i = 1; i < heights.length; i++) {
      heights = shift(heights, i, heights.length - 1);
      await trickleDown(i, i);
    }
  };

  await heapify();
  await sort();
  await finalize(props, heights);
}
