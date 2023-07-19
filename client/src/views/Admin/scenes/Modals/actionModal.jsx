
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditActivitie from '../Forms/editActivitie'

const ActivitieModal = ({ open, setOpen, data }) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Actividad</DialogTitle>
        <DialogContent>
          <EditActivitie data={data}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:'white'}}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActivitieModal;