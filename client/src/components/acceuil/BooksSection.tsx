import ContainerBook from "../acceuil/ContainerBook"
import Shelf from "../acceuil/Shelf"
import TitleSection from "../acceuil/TitleSection"


interface SectionBooksProps {
    title: string,
    subtitle: string,
    url: string,
    data: []
}

function BooksSection({ title, subtitle, data, url }: SectionBooksProps) {


    return (
        <section

            style={{
                minHeight: "250px",
                width: "100%",
                display: "flex",
                position: "relative",
                perspective: "1000px",
      
            }}
        >
            <div >
                <TitleSection url={url} title={title} subtitle={subtitle} />
                <Shelf />
            </div>

            <ContainerBook data={data} />

 
        </section>
    )
}
export default BooksSection