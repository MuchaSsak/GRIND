import { useQuery } from "@tanstack/react-query";

import getEntireProgram from "@/services/programs/getEntireProgram";

function useGetEntireProgram(programId: string) {
  const query = useQuery({
    queryKey: ["getEntireProgram", programId],
    queryFn: () => getEntireProgram(programId),
  });

  return query;
}

export default useGetEntireProgram;
