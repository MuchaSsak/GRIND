import { useQuery } from "@tanstack/react-query";

import getProgramDayById from "@/services/programs/programDays/getProgramDayById";

function useGetProgramDayById(programDayId: string) {
  const query = useQuery({
    queryKey: ["getProgramDayById"],
    queryFn: () => getProgramDayById(programDayId),
  });

  return query;
}

export default useGetProgramDayById;
