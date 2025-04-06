import { useMutation } from "@tanstack/react-query";

import setProgramsSortingOrder from "@/services/programs/setProgramsSortingOrder";
import { queryClient } from "@/services/tanstack";

function useSetProgramsSortingOrder() {
  const mutation = useMutation({
    mutationKey: ["setProgramsSortingOrder"],
    mutationFn: (newSortingOrder: number[]) =>
      setProgramsSortingOrder(newSortingOrder),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getProgramsSortingOrder"] }), // Refetch sorting order from Async Storage
  });

  return mutation;
}

export default useSetProgramsSortingOrder;
