import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Card, CardContent, Grid2, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getCakeById, deleteCake } from "../api/cake";

const CakeDetail: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [cake, setCake] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false); 

  const { id } = useParams();
  const navigate = useNavigate();
  const cakeId = Number(id)

  const handleDeleteClick = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false); 
  };

  const handleConfirmDelete = async () => {
      try {
          await deleteCake(cakeId);
          console.log('Cake deleted successfully');
          navigate("/")
      } catch (error) {
          console.error('Failed to delete cake:', error);
          setOpen(false);
      }
  };

  useEffect(() => {
    getCakeById(cakeId)
      .then((data) => {
        setCake(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
        
        setErrorMessage(err.response.data.message);
        setLoading(false);
      })
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  // if (errorMessage) {
  //   return <Typography color="error" align="center">{errorMessage}</Typography>;
  // }

  return (
    <Container>
      <Card sx={{ maxWidth: 600, margin: "auto" }}>
        <CardContent>
          <Typography variant="h4">Name: {cake.name}</Typography>
          <Typography variant="body1">Comment: {cake.comment}</Typography>
          <Typography variant="body1">Image: {cake.imageUrl}</Typography>
        </CardContent>
      </Card>
      <Grid2>
      <Typography sx={{ p: 1, color: "red" }}>{errorMessage}</Typography>
      <Button
            type="button"
            color="error"
            variant="contained"
            sx={{ ml: 2, mt: 3, mb: 2, mr: 2, width: '150px' }}
            onClick={handleDeleteClick}
        >
            Delete Cake
        </Button>
        <Button
            type="button"
            color="info"
            variant="contained"
            sx={{ ml: 2,  mt: 3, mb: 2, mr: 2,  width: '150px' }}
            onClick={() => {navigate("/")}}
        >
            Return
        </Button>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the cake: <strong>{cake.name}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="info" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
      </Grid2>
    </Container>
  );
};


export default CakeDetail;
