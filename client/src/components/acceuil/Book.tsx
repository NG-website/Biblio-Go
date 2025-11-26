import { Link } from "react-router-dom";
import theme from "../../theme";
import { API_URL } from "../../config";

interface BookProps {
  name: string;
  id: number;
  click: boolean;
  seeTitle?: boolean;
}

function Book({ name, id, click, seeTitle = true }: BookProps) {

  const loading = name === "loading";

  return (
    <Link
      to={click ? `${API_URL}book/${id}` : "#"}
      style={{ textDecoration: "none" }}
      aria-label={loading ? "Livre en chargement" : `Livre ${name}`}
    >
      <div
        style={{
          marginTop: "20px",
          width: "110px",
          height: "150px",
          perspective: "500px", 
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "4px",
            boxShadow: loading ? "none" : "2px 4px 12px rgba(0,0,0,0.3)",
            backgroundColor: loading ? "grey" : "#fff",
            backgroundImage: loading
              ? "none"
              : `url("${API_URL}api/uploads/book/${name}.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            cursor: click ? "pointer" : "default",
            transformStyle: "preserve-3d",
            transition: "transform 0.3s, box-shadow 0.3s",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.transform = "rotateY(-10deg) translateY(-5px)";
            el.style.boxShadow = "6px 10px 20px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = "rotateY(0deg) translateY(0px)";
            el.style.boxShadow = "2px 4px 12px rgba(0,0,0,0.3)";
          }}
        >

          {!loading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "5px",
                height: "100%",
                backgroundColor: "#ddd",
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
                transform: "translateX(-100%)",
              }}
            ></div>
          )}
        </div>
      </div>

      {seeTitle && (
        <p
          style={{
            textAlign: "center",
            maxWidth: "110px",
            overflow: "hidden",
             textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "14px",
            marginTop: "5px",
            color:theme.palette.text.primary,
          }}
        >
          {loading ? "" : name}
        </p>
      )}
    </Link>
  );
}

export default Book;
