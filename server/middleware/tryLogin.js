export const ip = []

export const resetAttempt = (id) => {
    ip[id].attemptCount = 0
}

const trylogin = (req, res, next) => {

    const existe = ip.filter((d) => { return d.ip === req.ip && d.email === req.body.email })

    if (existe.length === 0) {
        ip.push({ ip: req.ip, email: req.body.email, attemptCount: 0, ban: false })
    } 

    if (existe.length === 1) {
        existe.forEach(element => {
            element.attemptCount ++
        });
    }

       if (existe.length === 1 && existe[0].attemptCount > 5) {
        existe[0].attemptCount = 10
    }

    next()
}
export default trylogin