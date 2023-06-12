import wretch from "wretch"

const API_URL = "https://brotherhood-br.duckdns.org"

export const api = wretch(API_URL, {
  mode: "cors",
})
  .errorType("json")
  .resolve((r) => r.json())
