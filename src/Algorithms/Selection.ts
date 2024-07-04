export default function SelectionSort(
  heights: number[],
  setHeights: (heights: number[]) => void,
  ascending: boolean = true,
  fromStart: boolean = true
) {
  for (let i = 0; i < heights.length; i++) {
    setTimeout(() => {
      const sorted = fromStart
        ? heights.slice(0, i)
        : heights.slice(i);
      const remaining = fromStart
        ? heights.slice(i)
        : heights.slice(0, i);

      heights = sorted.concat(nextSelection([...remaining], ascending));
      setHeights(heights);
    }, i*100);
  }
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
  return newHeights;
}
