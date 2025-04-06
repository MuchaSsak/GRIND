import { useQuery } from "@tanstack/react-query";

import getProgramsSortingOrder from "@/services/programs/getProgramsSortingOrder";

function useGetProgramsSortingOrder() {
  const query = useQuery({
    queryKey: ["getProgramsSortingOrder"],
    queryFn: getProgramsSortingOrder,
  });

  return query;
}

export default useGetProgramsSortingOrder;
