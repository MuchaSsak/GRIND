import * as QueryParams from "expo-auth-session/build/QueryParams";

import { supabase } from "@/services/supabase";

async function createSessionFromURL(url: string) {
  // Sometimes Linking.useURL() returns undefined
  if (!url) return null;

  try {
    const { params, errorCode } = QueryParams.getQueryParams(url);
    if (errorCode)
      throw new Error(`Couldn't obtain the query params (${errorCode})`);

    const { access_token, refresh_token } = params;
    if (!access_token) return null;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;

    return data.session;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default createSessionFromURL;
