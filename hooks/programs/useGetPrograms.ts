import { useQuery } from "@tanstack/react-query";

import getPrograms from "@/services/programs/getPrograms";

function useGetPrograms() {
  const query = useQuery({
    queryKey: ["getPrograms"],
    queryFn: getPrograms,
  });

  return query;
}

export default useGetPrograms;
