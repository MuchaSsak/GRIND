import { useQuery } from "@tanstack/react-query";

import createSessionFromURL from "@/services/auth/createSessionFromURL";

function useCreateSessionFromURL(url: string) {
  const query = useQuery({
    queryKey: ["createSessionFromURL"],
    queryFn: () => createSessionFromURL(url),
  });

  return query;
}

export default useCreateSessionFromURL;
