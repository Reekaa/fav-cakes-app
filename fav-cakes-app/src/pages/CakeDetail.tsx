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

  const handleEditClick = () => {
      navigate(`/edit-cake/${id}`)
  };

  const handleConfirmDelete = async () => {
      try {
          await deleteCake(cakeId);
          console.log('Cake deleted successfully');
          navigate("/")
      } catch (err: any) {
          setErrorMessage(err.response.data.error)
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
        setErrorMessage(err.response.data.error);
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

  return (
    <Container>
      <Typography sx={{ p: 1, color: "red" }}>{errorMessage}</Typography>
      <Card sx={{ maxWidth: 600, height: 'auto', display: 'flex', flexDirection: 'column' , m: "auto" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5">{cake.name}</Typography>
          <Typography variant="body1">Comment: {cake.comment}</Typography>
          <Typography variant="body1">Yum Factor: {cake.yumFactor}</Typography>
        </CardContent>
      </Card>
      <Grid2>
      <Button
            type="button"
            variant="contained"
            sx={{ ml: 2,  mt: 3, mb: 2, mr: 2,  width: '150px',  backgroundColor: '#A7D7C5',
              '&:hover': {
                backgroundColor: '#89BCA1', 
              }, }}
            onClick={() => {navigate("/")}}
        >
            Return
      </Button>
      <Button
          variant="contained"
          sx={{ ml: 2,  mt: 3, mb: 2, mr: 2,  width: '150px',  backgroundColor: '#A7D7C5',
            '&:hover': {
              backgroundColor: '#89BCA1', 
            }, }}
          onClick={handleEditClick}
      >
          Edit
        </Button>
      <Button
            type="button"
            variant="contained"
            sx={{ ml: 2, mt: 3, mb: 2, mr: 2, width: '150px', 
              backgroundColor: '#FF6B6B',
              '&:hover': {
                backgroundColor: '#E63946',
              }
             }}
            onClick={handleDeleteClick}
        >
            Delete
        </Button>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the cake: <strong>{cake.name}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button 
                      onClick={handleClose}   
                      sx={{
                        backgroundColor: '#A7D7C5',
                        '&:hover': {
                          backgroundColor: '#89BCA1',
                        },
                      }} 
                      variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button 
                      onClick={handleConfirmDelete} 
                      sx={{
                        backgroundColor: '#FF6B6B', 
                        '&:hover': {
                          backgroundColor: '#E63946',
                        },
                      }}
                      variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
      </Grid2>
    </Container>
  );
};


export default CakeDetail;
