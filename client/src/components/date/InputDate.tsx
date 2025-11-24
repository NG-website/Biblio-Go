import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import theme from "../../theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// interface InputDateProps {
//   date: Date | null;
//   setDate: void;
// }
function InputDate({ date, setDate, width }) {
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="fr">
            <DemoContainer
                sx={{
                    width:width? width : "200px",
                    flexDirection: "column !important",
                    overflow: "hidden",
                    gap: "10px",
                    margin: 0
                }}
                components={['DatePicker']}
            >
                <DatePicker
                    value={dayjs(date)}
                    onChange={(newValue) => setDate(newValue.$d)}
                    slotProps={{
                        day: {
                            sx: {
                                "&:hover": {
                                    bgcolor: theme.palette.primary.light,
                                },
                                "&.Mui-selected": {
                                    backgroundColor: `${theme.palette.primary.main} !important`,
                                    color: "#fff !important",
                                },
                            },
                        },
                        textField: {
                            sx: {
                                "& .MuiPickersInputBase-sectionContent": {
                                    color: "text.primary",
                                },
                                "& .MuiSvgIcon-root": {
                                    fill: theme.palette.primary.main
                                },
                            },
                        },
                    }}
                />

                <MobileTimePicker
                    value={dayjs(date)}
                    onChange={(newValue) => setDate(newValue.$d)}
                    sx={{
                       
                        margin: "0!important",
                        "& .MuiPickersInputBase-sectionContent": {
                            color: "text.primary",
                        },
                        "& .MuiSvgIcon-root": {
                            fill: theme.palette.primary.main
                        },
                    }}

                    localeText={{
                        toolbarTitle: "Sélectionner l'heure",
                        cancelButtonLabel: "Annuler",
                        okButtonLabel: "OK"
                    }}
                />

            </DemoContainer>
        </LocalizationProvider>
    )
}
export default InputDate