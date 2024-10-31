import { useMutation } from "react-query";
import { LoginResponse } from "../models/login";

export function useStudentLogin(code: string, dob: string) {
  return useMutation(async () => {
    const res = await fetch("/api/student/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, dob }),
    });
    return (await res.json()) as LoginResponse;
  });
}