import { useEffect, useState } from "react"
import BooksSection from "./BooksSection"
import { Filter } from "../acceuil/NavFilter/Context"
import { useAuthContext } from "../Context/AuthContext"
import { API_URL } from "../../config"

function Home() {
    const filter = Filter()?.filter
    const [book, setBook] = useState([])
    const { user } = useAuthContext()
    const userId = user ? user?.userId : null

    useEffect(() => {

        fetch(`${API_URL}api/book/all`,{
            credentials:"include",
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (!user) {
                    if (filter) {
                        const dataFilter = data.filter((d) => d.categoryId == filter)
                        setBook(dataFilter)
                    } else {
                        setBook(data)
                    }
                }
                if (user) {
                    let booking = []
                    fetch(`${API_URL}api/bookuser/id`, {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ data: { deposit: false } }),
                    })
                        .then((res) => { return res.json() })
                        .then((bookUser) => {
                            if (bookUser[0]) {
                                console.log(bookUser)
                                bookUser.forEach(element => {
                                    booking.push(element.bookId)
                                });

                                if (booking[0]) {
                                    const newFilter = data.filter((b) => !booking.includes(b.id))
                                    if (filter) {
                                        const dataFilter = newFilter.filter((d) => d.categoryId == filter)
                                        setBook(dataFilter)
                                    } else {
                                        setBook(newFilter)
                                    }
                                }
                            } else {
                                if (filter) {
                                    const dataFilter = data.filter((d) => d.categoryId == filter)
                                    setBook(dataFilter)
                                } else {
                                    setBook(data)
                                }
                            }
                        })
                        .catch(console.error)
                }
            })
    }, [filter, user])

    return (
        <div
            style={{
                minHeight: "250px",
                width: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <BooksSection
                data={book?.sort((a, b) => b.note - a.note).slice(0, 10)}
                title="Les Meilleurs"
                subtitle="Les mieux notées"
                url="best"
            />
            <BooksSection
                data={book?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10)}
                title="Les Nouveautés"
                subtitle="Les derniers sortis"
                url="new"
            />
            <BooksSection
                data={book?.sort((a, b) => (b.borrow) - (a.borrow)).slice(0, 10)}
                title="Les Tendances"
                subtitle="Les plus demander"
                url="mode"
            />
        </div>
    )
}

export default Home
