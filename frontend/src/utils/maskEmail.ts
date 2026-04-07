export const maskEmail = (email: string): string => {
    const [user, domain] = email.split("@");

    if (user.length <= 2)
        return `*@${domain}`;

    const masked = "*".repeat(user.length -3)

    return `${masked}@${domain}`
}