import { SortProps, statusProps } from "./Props";

export function swap(array: number[], i1: number, i2: number): number[] {
  const newArray = [...array];
  [newArray[i1], newArray[i2]] = [newArray[i2], newArray[i1]];
  return newArray;
}

export function shift(array: number[], to: number, from: number): number[] {
  return [
    ...array.slice(0, to),
    array[from],
    ...array.slice(to, from),
    ...array.slice(from + 1),
  ];
}

export async function visualize(
  heights: number[],
  sortProps: SortProps,
  statusProps: statusProps
) {
  await new Promise<void>((resolve) => {
    const { targets, selected, sorting, sorted } = statusProps;
    const { setBars, interval } = sortProps;
    let { bars } = sortProps;
    setTimeout(() => {
      bars = heights.map((height, index) => ({
        width: bars[index].width,
        height: height,
        status:
          (typeof selected === "number" && index === selected) ||
          (typeof selected === "object" && selected.includes(index))
            ? "selected"
            : (typeof targets === "number" && index === targets) ||
              (typeof targets === "object" && targets.includes(index))
            ? "targeted"
            : (typeof sorting === "number" && index < sorting) ||
              (typeof sorting === "object" && sorting.includes(index))
            ? "sorting"
            : (typeof sorted === "number" && index < sorted) ||
              (typeof sorted === "object" && sorted.includes(index))
            ? "sorted"
            : "unsorted",
      }));
      setBars(bars);
      resolve();
    }, interval);
  });
}

export async function finalize(props: SortProps, heights: number[]) {
  const { bars, ascending } = props;
  const sorted = heights
    .slice(1)
    .every((height, i) =>
      ascending ? height >= heights[i] : height <= heights[i]
    );

  await visualize(heights, props, { sorting: bars.length });
  if (sorted) {
    await visualize(heights, props, { sorted: bars.length });
  }
}
