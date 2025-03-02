import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { getCakeById, updateCake } from "../api/cake";

interface FormState {
  name: string;
  comment: string;
  imageUrl: string;
  yumFactor: number;
}

interface FormErrors {
  name?: string;
  comment?: string;
  imageUrl?: string;
  yumFactor?: string;
}

const UpdateCake: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormState>({
    name: "",
    comment: "",
    imageUrl: "",
    yumFactor: 0,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!id) {
        setErrorMessage("Invalid cake ID");
        return;
    }

    getCakeById(Number(id))
      .then((data) => {
        setFormValues(data);
      })
      .catch(() => {
        setErrorMessage("Failed to load cake details.");
      });
  }, [id]);

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    setFormValues({ ...formValues, yumFactor: e.target.value as number });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormErrors({});
    let errors: FormErrors = {};

    if (!formValues.name) errors.name = "Cake name is required.";
    if (!formValues.comment) {
      errors.comment = "Comment is required.";
    } else if (formValues.comment.length < 5 || formValues.comment.length > 200) {
      errors.comment = "Comment must be between 5 and 200 characters.";
    }
    if (!formValues.imageUrl) errors.imageUrl = "Image URL is required.";
    if (formValues.yumFactor === 0) errors.yumFactor = "Yum Factor is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await updateCake(Number(id), formValues);
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };
  
  return (
    <Container>
      <Container component="main" maxWidth="xs">
        <Box>
          <Typography variant="h3" gutterBottom align="center">
            Update Cake
          </Typography>
          {errorMessage && <Typography sx={{ p: 1, color: "red" }}>{errorMessage}</Typography>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              required
              name="name"
              label="Name"
              fullWidth
              value={formValues.name}
              onChange={handleInput}
              variant="outlined"
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              required
              multiline
              name="comment"
              label="Comment"
              fullWidth
              value={formValues.comment}
              onChange={handleInput}
              variant="outlined"
              error={!!formErrors.comment}
              helperText={formErrors.comment}
              sx={{ mt: 2 }}
            />
            <TextField
              required
              name="imageUrl"
              label="Image URL"
              fullWidth
              value={formValues.imageUrl}
              onChange={handleInput}
              variant="outlined"
              error={!!formErrors.imageUrl}
              helperText={formErrors.imageUrl}
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth sx={{ mt: 2 }} error={!!formErrors.yumFactor}>
              <InputLabel id="yumFactor-label">Yum Factor</InputLabel>
              <Select
                required
                labelId="yumFactor-label"
                name="yumFactor"
                value={formValues.yumFactor}
                onChange={handleSelectChange}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formErrors.yumFactor && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {formErrors.yumFactor}
              </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button type="submit" color="primary" variant="contained" sx={{ mr: 2 }}>
                Update Cake
              </Button>
              <Button color="secondary" variant="contained" onClick={() => navigate("/")}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default UpdateCake;
