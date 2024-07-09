export type statusType =
  | "unsorted"
  | "targeted"
  | "selected"
  | "sorting"
  | "sorted";
export type partitionType = "Lomuto" | "Hoare";

export interface BarProps {
  width: number;
  height: number;
  status: statusType;
}

export interface SliderProps {
  text: string;
  min: number;
  max: number;
  step: number;
  value: number;
  setValue: (value: number) => void;
}

export interface StatusProps {
  targets?: number[] | number;
  selected?: number[] | number;
  sorting?: number[] | number;
  sorted?: number[] | number;
}

export interface SortContextType {
  arraySize: number;
  setArraySize: (size: number) => void;
  sortSpeed: number;
  setSortSpeed: (speed: number) => void;
  ascending: boolean;
  setAscending: (asc: boolean) => void;
  multiThread: boolean;
  setMultiThread: (multi: boolean) => void;
  partition: partitionType;
  setPartition: (part: partitionType) => void;
  degree: number;
  setDegree: (deg: number) => void;
  checkAnim: boolean;
  setCheckAnim: (check: boolean) => void;
  bars: BarProps[];
  setBars: (bars: BarProps[]) => void;
  heights: number[];
  interval: number;
  visualize: (heights: number[], status: StatusProps) => Promise<void>;
  checkSorted: (
    heights: number[],
    checkAnim: boolean,
    visualize: (heights: number[], statusInfo: StatusProps) => Promise<void>
  ) => Promise<boolean>;
  finalize: (
    heights: number[],
    checkSorted: (heights: number[], checkAnim: boolean) => Promise<boolean>,
    visualize: (heights: number[], statusInfo: StatusProps) => Promise<void>
  ) => Promise<void>;
}
