import { swap, getBars, setAllSorted, SortProps } from "./Utils";

// export default async function MergeSort(props: SortProps) {
//   const { setBars, timeInterval, ascending } = props;
//   let { bars } = props;
//   let heights = bars.map((bar) => bar.height);

//   for (let i = 1; i < heights.length; i++) {
//     for (let j = heights.length - 1; j >= i; j--) {
//       await new Promise<void>((resolve) => {
//         setTimeout(() => {
// 					bars = getBars(bars, heights, [j, j - 1], i - 1);
//           setBars(bars);
// 					if (heights[j] < heights[j - 1] === ascending) {
// 						heights = swap(heights, j, j - 1);
// 					}
//           resolve();
//         }, timeInterval);
//       });
//     }
//   }

//   setBars(setAllSorted(bars));
// }

function sort(heights: number[]): number[] {
  if (heights.length === 1) return heights;

  let half1 = heights.slice(0, heights.length / 2);
  let half2 = heights.slice(heights.length / 2);

  half1 = sort(half1);
  half2 = sort(half2);

  return merge(half1, half2);
}

function merge(half1: number[], half2: number[]): number[] {
  const merged: number[] = [];

  while (half1.length !== 0 && half2.length !== 0) {
    if (half1[0] > half2[0]) {
      merged.push(half2[0]);
      half2 = half2.slice(1);
    } else {
      merged.push(half1[0]);
      half1 = half1.slice(1);
    }
  }

  return [...merged, ...half1, ...half2];
}

console.log(sort([5, 2, 3, 5, 8, 9, 1]))