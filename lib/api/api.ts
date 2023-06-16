import wretch from "wretch"

import { useAuth } from "@/hooks/useAuth"

const API_URL = "https://brotherhood-br.duckdns.org"

export const publicFetch = () => {
  return wretch(API_URL, {
    mode: "cors",
  })
}

export const protectedFetch = () => {
  const { externalToken } = useAuth.getState()

  return wretch(API_URL, {
    mode: "cors",
  }).headers({
    sso_token: externalToken ?? "",
  })
}
