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

export interface DisplayProps {
  bars: BarProps[];
}

export interface SliderProps {
  text: string;
  min: number;
  max: number;
  step: number;
  value: number;
  setValue: (value: number) => void;
}

export interface SortProps {
  bars: BarProps[];
  setBars: (bars: BarProps[]) => void;
  interval: number;
  ascending: boolean;
  multiThread?: boolean;
  partition?: partitionType;
}

export interface statusProps {
  targets?: number[] | number;
  selected?: number[] | number;
  sorting?: number[] | number;
  sorted?: number[] | number;
}
