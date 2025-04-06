import { useQuery } from "@tanstack/react-query";

import getProgramExerciseById from "@/services/programs/programExercises/getProgramExerciseById";

function useGetProgramExerciseById(programExerciseId: string) {
  const query = useQuery({
    queryKey: ["getProgramExerciseById"],
    queryFn: () => getProgramExerciseById(programExerciseId),
  });

  return query;
}

export default useGetProgramExerciseById;
