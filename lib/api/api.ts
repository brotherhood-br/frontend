import wretch from "wretch"

import { storageKey } from "@/hooks/useAuth"

const API_URL = "https://brotherhood-br.duckdns.org"

export const protectedFetch = () => {
  const storage = localStorage.getItem(storageKey) ?? ""
  const token = JSON.parse(storage)?.state.externalToken

  if (!token) {
    console.error("No token found")
    // redirect user to the login page
  }

  return wretch(API_URL, {
    mode: "cors",
  }).headers({
    sso_token: token,
  })
}
