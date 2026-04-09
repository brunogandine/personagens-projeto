const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMe = async () => {
  const res = await fetch(`${BASE_URL}api/auth/me`, {
    credentials: "include"
  })

  if(!res.ok)
    return { success: false }

  const data = await res.json();
  
  return { success: true, user: data.user };
}