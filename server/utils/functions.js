



function generateTokenRandom(size) {
    const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=[]{}|;:,.<>?/`~"
    let token = ""
    let keyRandom = ""
    for (let i = 0; i < key.length; i++) {
        keyRandom += (key.charAt(Math.floor(Math.random() * key.length)));
    }

    for (let i = 0; i < size; i++) {
        token += (keyRandom.charAt(Math.floor(Math.random() * key.length)));
    }

    return (token)
}
export default generateTokenRandom


export const formatDate = (date) => {
    return (
        new Date(date).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    )
}

export const IncrementeDate= (date) => {
        const date_ = new Date(date)
        const heureLocal = (new Date(date_.setHours(date_.getHours()+2)))
        return heureLocal
}

// const db = "2019-01-10T11:30:00.000Z"
// console.log(IncrementeDate(db))
// console.log(new Date (db).toLocaleTimeString())
// console.log(formatDate(db))



