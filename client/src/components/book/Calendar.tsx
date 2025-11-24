import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

dayjs.locale('fr');

export default function Calendar({ onChange, value }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <DateCalendar
        onChange={onChange}
        // defaultValue={dayjs(value)}
        sx={{
          width: '100%',
          '&.MuiDateCalendar-root': {
            height: `200px !important`, 
          },
          '& .MuiPickersSlideTransition-root': {
            minHeight: `200px !important`,
          },
          '& .MuiPickersDay-root': {
            fontSize: '0.75rem',
            height: '22px',
            width: '22px',
          },
          '& .MuiDayCalendar-weekContainer': {
            minHeight: '20px',
          },
          '& .MuiPickersCalendarHeader-root': {
            height: '30px',
            margin: 0,
            padding: 0,
          },
          '& .MuiPickersCalendarHeader-label': {
            fontSize: '12px',
          },
          '& .MuiPickersArrowSwitcher-button': {
            padding: 0,
          },


          '& .MuiPickersDay-root.Mui-selected': {
            backgroundColor: '#eb7600ff !important',
          },

          '& .MuiPickersDay-root.Mui-selected:hover': {
            backgroundColor: "#eb7600ff !important",
          },

          '& .MuiPickersDay-root:hover': {
            backgroundColor: '#eb7600ff !important',
          },
          '& .MuiPickersDay-today': {
            border: '1px solid #eb7600ff !important',
          },
        }}
      />
    </LocalizationProvider>
  );
}
