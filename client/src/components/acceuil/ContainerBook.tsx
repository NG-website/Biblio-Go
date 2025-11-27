import { useRef, useEffect, useState } from "react";
import Book from "../acceuil/Book";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import theme from "../../theme";

type BookType = {
  name: string;
  id: number;
};

interface ContainerBookProps {
  data?: BookType[];
}

function ContainerBook({ data = [] }: ContainerBookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const isHoverRef = useRef(false);

  const speed = 0.75; 
  const intervalMs = 16; 
 
  const [totalWidth, setTotalWidth] = useState(0);

  const scrollRight = () => {
    setOffset((prev) => {
      let newOffset = prev + 75;
      if (newOffset >= totalWidth) newOffset -= totalWidth;
      return newOffset;
    });
  };

  const scrollLeft = () => {
    setOffset((prev) => {
      let newOffset = prev - 75;
      if (newOffset < 0) newOffset += totalWidth; 
      return newOffset;
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;
    setTotalWidth(containerRef.current.scrollWidth / 2); 
  }, [data]);

  useEffect(() => {
    if (!data.length || totalWidth === 0) return;

    const interval = setInterval(() => {
      if (isHoverRef.current) return;

      setOffset((prev) => {
        let newOffset = prev + speed;
        if (newOffset >= totalWidth) {
          newOffset -= totalWidth;
        }
        return newOffset;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [data, totalWidth]);

  const loopedData = [...data, ...data];

  return (
    <div
      style={{ position: "relative", width: "100%", overflow: "hidden", height: "250px" }}
      onMouseEnter={() => (isHoverRef.current = true)}
      onMouseLeave={() => (isHoverRef.current = false)}
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          transform: `translateX(-${offset}px)`,
          transition: "transform 0s linear",
          gap: "20px",
          height: "250px",
        }}
      >
        {loopedData.map((book, index) => (
          <div key={`${book.id}-${index}`}>
            <Book seeTitle click id={book.id} name={book.name} />
          </div>
        ))}

      </div>
      <ArrowCircleRightIcon
        onClick={() => { scrollRight() }}
        sx={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-40%)",
          fontSize: 50,
          cursor: "pointer",
          zIndex: 20,
          fill: theme.palette.primary.main,
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            fill: theme.palette.secondary.main
          }
        }}
      />
      <ArrowCircleLeftIcon
        onClick={() => { scrollLeft() }}
        sx={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-40%)",
          fontSize: 50,
          cursor: "pointer",
          zIndex: 20,
          fill: theme.palette.primary.main,
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            fill: theme.palette.secondary.main
          }

        }}
      />
    </div>
  );
}

export default ContainerBook;
