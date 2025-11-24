

function Shelf() {

    return (
        <>
            <div
            className="shelfBottom"
                style={{
                    boxSizing:"content-box",
                    height: "20px",
                    width: "100%",
                    background: "linear-gradient(180deg, rgba(222, 186, 132, 1), rgba(173, 107, 37, 1))",
                    position: "absolute",
                    left: "80px",
                    top: "208px",
                     transformOrigin: "left center",
                    boxShadow: "5px 5px 25px 5px rgba(0, 0, 0, 0.8)",
                }}
            >
            </div>
            <div
             className="shelfTop"
                style={{
                    width: "100%",
                    height: "170px",
                    background: "linear-gradient(180deg,  rgba(222, 186, 132, 1),  rgba(173, 107, 37, 1))",
                    position: "absolute",
                    left: "80px",
                    top: "98px",
                    transform: "rotateX(-110deg)",
                }}
            >
            </div>
            </>
    )
}
export default Shelf