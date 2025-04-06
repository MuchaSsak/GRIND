import { useQuery } from "@tanstack/react-query";

import getUser from "@/services/auth/getUser";

function useGetUser() {
  const query = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  return query;
}

export default useGetUser;
