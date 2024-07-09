import { useCallback } from "react";
import { useSortContext } from "../Utils/SortContext";
import SelectionSort from "./Selection";
import InsertionSort from "./Insertion";
import BubbleSort from "./Bubble";
import HeapSort from "./Heap";
import MergeSort from "./Merge";
import QuickSort from "./Quick";

export const useSelectionSort = () => {
  const context = useSortContext();
  return useCallback(async () => SelectionSort(context), [context]);
};

export const useInsertionSort = () => {
  const context = useSortContext();
  return useCallback(async () => InsertionSort(context), [context]);
};

export const useBubbleSort = () => {
  const context = useSortContext();
  return useCallback(async () => BubbleSort(context), [context]);
};

export const useHeapSort = () => {
  const context = useSortContext();
  return useCallback(async () => HeapSort(context), [context]);
};

export const useMergeSort = () => {
  const context = useSortContext();
  return useCallback(async () => MergeSort(context), [context]);
};

export const useQuickSort = () => {
  const context = useSortContext();
  return useCallback(async () => QuickSort(context), [context]);
};