import type { AuthUser } from "@/types/authUser";
import { Request } from "./apiClient";

type GetMeResponse = 
  | { success: true, user: AuthUser }
  | { success: false }

export const getMe = async (): Promise<GetMeResponse> => {
  const res = await Request.get<{user: AuthUser}>(`/auth/me`);

  if(!res || !res.ok)
    return { success: false };
  
  return { success: true, user: res.data.user };
}