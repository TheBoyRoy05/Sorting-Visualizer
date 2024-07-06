export type statusType = "unsorted" | "targeted" | "pivot" | "sorting" | "sorted";
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
