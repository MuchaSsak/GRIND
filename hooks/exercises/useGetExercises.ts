import { useQuery } from "@tanstack/react-query";

import getExercises from "@/services/exercises/getExercises";

function useGetExercises() {
  const query = useQuery({
    queryKey: ["getExercises"],
    queryFn: getExercises,
  });

  return query;
}

export default useGetExercises;
