export const emailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

export const characterInvalid = (input) => {
    const characterRegex = /[<>'";\/\\\(\)\{\}\[\]=\+\`~!@#$%^&*]/;
    return characterRegex.test(input);
}

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
        minute: "numeric",
        hour: "numeric",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}