import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from '@mui/material';
import { format, addDays } from 'date-fns';
import { useState } from 'react';

interface ScheduleModalProps {
    open: boolean;
    onClose: () => void;
    serviceId: string | undefined;
}

const generateDates = (daysCount: number = 7): Date[] => {
  const today = new Date();
  return Array.from({ length: daysCount }, (_, i) => addDays(today, i));
};

const timeSlotsByDate: { [key: string]: string[] } = {
  '2024-09-23': ['08:00', '09:00', '10:00'],
  '2024-09-24': ['11:00', '12:00', '13:00'],
  '2024-09-25': ['14:00', '15:00', '16:00'],
};

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ open, onClose, serviceId }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleDateSelect = (date: string): void => {
    setSelectedDate(date);
    setSelectedTime(''); 
  };

  const handleTimeSelect = (time: string): void => setSelectedTime(time);

  const availableDates: Date[] = generateDates(7);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Agendar serviço</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Selecione uma data e um horário disponível para o serviço</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
          {availableDates.map((date) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            return (
              <Grid item key={formattedDate}>
                <Button
                  variant={selectedDate === formattedDate ? 'contained' : 'outlined'}
                  onClick={() => handleDateSelect(formattedDate)}
                >
                  {format(date, 'dd/MM')}
                </Button>
              </Grid>
            );
          })}
        </Grid>
        {selectedDate && (
          <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
            {timeSlotsByDate[selectedDate]?.map((time) => (
              <Grid item key={time}>
                <Button
                  variant={selectedTime === time ? 'contained' : 'outlined'}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              </Grid>
            )) || <Typography variant="body2">Nenhum horário disponível para essa data.</Typography>}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button
          onClick={() => {
            console.log(`Agendamento confirmado para o serviço ${serviceId} na data ${selectedDate} às ${selectedTime}`);
            onClose();
          }}
          color="primary"
          disabled={!selectedDate || !selectedTime}
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
};