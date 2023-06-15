import wretch from "wretch"

const API_URL = "https://brotherhood-br.duckdns.org"

let token: string | null = ""

if (typeof window !== "undefined") {
  token = localStorage.getItem("token")
}

export const api = wretch(API_URL, {
  mode: "cors",
}).headers({
  sso_token: token ?? "",
})
