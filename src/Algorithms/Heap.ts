import { SortContextType } from "../Utils/Props";

export default async function HeapSort(context: SortContextType) {
  const { ascending, degree, stats, setStats } = context;
  const { swap, shift, visualize, finalize } = context;
  let { heights } = context;

  const startTime = Date.now();
  let { comparisons, time } = stats;
  (comparisons = 0), (time = 0);

  const heapify = async () => {
    const parent = (index: number) =>
      index == 0 ? -1 : Math.floor((index - 1) / degree);

    const bubbleUp = async (index: number) => {
      await visualize(heights, { targets: [index] });
      if (parent(index) < 0) return;

      comparisons++;
      if (heights[index] < heights[parent(index)] === ascending) {
        time = (Date.now() - startTime) / 1000;
        setStats({ ...stats, comparisons, time });

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
        await visualize(heights, status);
        comparisons++;
        time = (Date.now() - startTime) / 1000;
        setStats({ ...stats, comparisons, time });
        if (heights[j] < heights[nextIdx] === ascending) nextIdx = j;
      }

      if (nextIdx === index) return;
      const status = {
        targets: [nextIdx, index],
        sorting: heapStart,
      };
      heights = swap(heights, nextIdx, index);
      await visualize(heights, status);

      time = (Date.now() - startTime) / 1000;
      setStats({ ...stats, comparisons, time });
      await trickleDown(heapStart, nextIdx);
    };

    for (let i = 1; i < heights.length; i++) {
      const status = { targets: heights.length - 1, sorting: i };
      await visualize(heights, status);

      heights = shift(heights, i, heights.length - 1);
      await trickleDown(i, i);
    }
  };

  await heapify();
  await sort();

  time = (Date.now() - startTime) / 1000;
  setStats({ ...stats, comparisons, time });
  await finalize(heights);
}