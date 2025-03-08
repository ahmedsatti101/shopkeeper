import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://shopkeeper-e1dz.onrender.com/api/user/register/", () => {
    return HttpResponse.json({ id: 12, username: "User145" });
  }),

  http.post("https://shopkeeper-e1dz.onrender.com/api/token/", () => {
    return HttpResponse.json({ access: "1234", refresh: "ewj4378fwbhjs" });
  }),
];
