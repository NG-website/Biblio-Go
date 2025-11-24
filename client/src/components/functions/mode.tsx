import { useEffect, useState } from "react"

function darkMode({reset}) {
    
    const [darkMode, setDarkMode] = useState(localStorage.getItem("Theme") === "true")

    useEffect(() => {

        const darkMode = localStorage.getItem("Theme")
   
        //console.log(darkMode)

        if (darkMode === null) {
            setDarkMode(false)
        }

        if (darkMode === "false") {
            setDarkMode(false)

        }

        if (darkMode === "true") {
            setDarkMode(true)
        }

    }, [reset])

    return darkMode

}
export default darkMode