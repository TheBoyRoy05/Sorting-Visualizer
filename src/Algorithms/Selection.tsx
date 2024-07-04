import { BarProps } from "../Components/Display";

export default function SelectionSort(
  bars: BarProps[],
  setBars: (bars: BarProps[]) => void,
  ascending: boolean = true,
  fromStart: boolean = true
) {
  const timeInterval = Math.min(10 / bars.length, 1) * 1000;
  let heights = bars.map((bar) => bar.height);

  for (let i = 0; i < heights.length; i++) {
    setTimeout(() => {
      const sorted = fromStart ? heights.slice(0, i) : heights.slice(i);
      const remaining = fromStart ? heights.slice(i) : heights.slice(0, i);
      const [nextSorted, nextIndex] = nextSelection([...remaining], ascending);

      bars = heights.map((height, index) => ({
        width: bars[index].width,
        height: height,
        status:
          index === Number(nextIndex) + i
            ? ("sorting" as const)
            : (fromStart && index < i) || (!fromStart && index > i)
            ? ("sorted" as const)
            : ("unsorted" as const),
      }));
      setBars(bars);

      heights = sorted.concat(nextSorted);
    }, i * timeInterval);
  }

  setTimeout(() => {
    bars = bars.map((bar) => ({
      ...bar,
      status: "sorted" as const,
    }));
    setBars(bars)
  }, heights.length * timeInterval);
}

function nextSelection(remainingHeights: number[], ascending: boolean) {
  const newHeights = [...remainingHeights];
  const next = ascending
    ? Math.min(...remainingHeights)
    : Math.max(...remainingHeights);
  const nextIndex = newHeights.indexOf(next);
  [newHeights[0], newHeights[nextIndex]] = [
    newHeights[nextIndex],
    newHeights[0],
  ];
  return [newHeights, nextIndex];
}
