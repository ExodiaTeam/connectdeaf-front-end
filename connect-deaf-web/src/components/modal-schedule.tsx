import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from '@mui/material';
import { format, addDays } from 'date-fns';
import { useState } from 'react';

interface ScheduleModalProps {
    open: boolean;
    onClose: () => void;
    serviceId: string | undefined;
    professionalId: string;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
}

const generateDates = (daysCount: number = 7): Date[] => {
  const today = new Date();
  return Array.from({ length: daysCount }, (_, i) => addDays(today, i));
};

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ open, onClose, serviceId, professionalId }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDateSelect = (date: string): void => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    fetchTimeSlots(date);
  };

  const handleTimeSelect = (timeSlot: TimeSlot): void => setSelectedTimeSlot(timeSlot);

  const fetchTimeSlots = async (date: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log('data:', date);
      const response = await fetch(`http://localhost:8080/api/professionals/${professionalId}/${date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar horários disponíveis');
      }
      const data = await response.json();
      console.log('Horários:', data);

      const availableTimeSlots = data.map((slot: { startTime: string, endTime: string }) => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
      }));
      setTimeSlots(availableTimeSlots);
    } catch (error) {
      console.error('Erro:', error);
      setTimeSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const availableDates: Date[] = generateDates(7);

  const handleAppointmentCreation = async (date: string, timeSlot: TimeSlot | null, serviceId: string | undefined) => {
    if (!timeSlot) {
      alert('Por favor, selecione um horário.');
      return;
    }

    try {
      const token = localStorage.getItem('token') || '';
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const customerId = JSON.parse(decodedPayload).sub;
      if (!token) {
        throw new Error("Token não encontrado");
      }

      const appointmentData = {
        date,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        serviceId,
        professionalId,
        customerId
      };

      const response = await fetch(`http://localhost:8080/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao agendar serviço:", errorData);
        throw new Error(errorData.message || "Erro ao agendar serviço");
      }

      const result = await response.json();
      console.log("Serviço agendado com sucesso:", result);
    } catch (error) {
      console.error("Erro ao agendar serviço:", error);
    }
  }

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
            {loading ? (
              <Typography variant="body2">Carregando horários...</Typography>
            ) : (
              timeSlots.length > 0 ? (
                timeSlots.map((timeSlot) => (
                  <Grid item key={timeSlot.startTime}>
                    <Button
                      variant={selectedTimeSlot?.startTime === timeSlot.startTime ? 'contained' : 'outlined'}
                      onClick={() => handleTimeSelect(timeSlot)}
                    >
                      {timeSlot.startTime} - {timeSlot.endTime}
                    </Button>
                  </Grid>
                ))
              ) : (
                <Typography variant="body2">Nenhum horário disponível para essa data.</Typography>
              )
            )}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button
          onClick={() => {
            handleAppointmentCreation(selectedDate, selectedTimeSlot, serviceId);
            onClose();
          }}
          color="primary"
          disabled={!selectedDate || !selectedTimeSlot}
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
};