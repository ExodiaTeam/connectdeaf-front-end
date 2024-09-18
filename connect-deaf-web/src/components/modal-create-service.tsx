import { useState } from "react";
import { Modal, TextField, Button, Box } from "@mui/material";

interface ModalCreateServiceProps {
  open: boolean;
  onClose: () => void;
  userId: string | undefined;
}

export const ModalCreateService: React.FC<ModalCreateServiceProps> = ({
  open,
  onClose,
  userId,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceValue, setServiceValue] = useState("");

  const handleCreateService = async (event: React.FormEvent) => {
    event.preventDefault();

    const serviceData = {
      name: serviceName,
      description: serviceDescription,
      value: parseFloat(serviceValue),
    };

    try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token não encontrado");
        }
  
        const response = await fetch(`http://localhost:8080/api/services?professionalId=${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(serviceData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro ao criar serviço:", errorData);
          throw new Error(errorData.message || "Erro ao criar serviço");
        }
  
        const result = await response.json();
        console.log("Serviço criado com sucesso:", result);
        onClose();
      } catch (error) {
        console.error("Erro ao criar serviço:", error);
        alert(`Erro ao criar serviço: ${error}`);
      }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 className="mb-6 text-xl font-bold">Cadastrar Serviço</h2>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleCreateService}
        >
          <TextField
            label="Nome do Serviço"
            variant="outlined"
            fullWidth
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
          <TextField
            label="Descrição do Serviço"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
          />
          <TextField
            label="Valor"
            variant="outlined"
            fullWidth
            value={serviceValue}
            onChange={(e) => setServiceValue(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Criar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
