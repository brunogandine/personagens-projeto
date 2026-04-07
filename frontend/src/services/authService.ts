export const getMe = async () => {
  const res = await fetch("http://localhost:3000/api/auth/me", {
    credentials: "include"
  })

  if(!res.ok)
    return { success: false }

  const data = await res.json();
  
  return { success: true, user: data.user };
}