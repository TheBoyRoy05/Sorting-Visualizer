import { useCallback } from 'react';
import { useSortContext } from "../Utils/SortContext";
import SelectionSort from './Selection';

export const useSelectionSort = () => {
  const { bars, ascending, swap, visualize, finalize } = useSortContext();

  const selectionSort = useCallback(async () => SelectionSort()
  , [bars, ascending, swap, visualize, finalize]);

  return selectionSort;
};