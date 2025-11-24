import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { Box } from '@mui/material';

export default function DigitalClockValue({ date, setDate }) {

  return (
    <LocalizationProvider adapterLocale='fr' dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          width: "50%",
          justifyContent: "space-around",
          backgroundColor: "",
          height: "50px",
        }}
      >
        {/* <DemoItem  label="heure de retrait" sx={{ border:"1px solid black",width:"50%"}}> */}
        <DigitalClock
         sx={{
          width: "90%",
          scrollbarWidth: "none",
          "& ul": {
            padding: 0,
            margin: 0,
            textAlign: "center",
          },
          "& li": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "48.1px", // fixe la hauteur uniforme des lignes
            textAlign: "center",
          },
          "& .MuiButtonBase-root.Mui-selected:hover": {
              backgroundColor: "currentColor !important",
              color: "white",
            },
          "&:hover .Mui-selected": {

              backgroundColor:"currentColor"
          },
                    "& .Mui-selected": {

            fontWeight: "bold",
          },

        }}
          defaultValue={dayjs(date)}
          value={dayjs(date)}
          onChange={(h) => setDate(h.$d)}

        />
        {/* </DemoItem> */}


      </Box>
    </LocalizationProvider>
  );
}
