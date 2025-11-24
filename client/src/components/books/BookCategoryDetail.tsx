import { useEffect, useState } from "react"
import Book from "../acceuil/Book"
import { useParams } from "react-router-dom"

function CategoryDetails() {
    const url = useParams()
    console.log(url)
    const [data, setData] = useState()
    useEffect(() => {
        fetch(`http://localhost:3000/book/${url.cat}`)
            .then((res) => {
                if (!res.ok) {
                    console.log("then", res)
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setData(data)

            })
    }, [])
    return (
        <>
        <h1
        style={{
            marginTop:"20px"
        }}
        >{url.cat}</h1>
        <div
        style={{
            display:"flex",
            gap:"20px",
            flexWrap:"wrap",
            padding:"20px",
            justifyContent:"center"
        }}
        >
            {data && data.map((d, i) => (
                <Book id={d.id} seeTitle={true} click={true} key={i} name={d.name} />
            ))}
        </div>
</>

    )
}
export default CategoryDetails