import React, { useState } from "react";
import { Container, Typography, Grid2, Button, FormControl, Box, InputLabel, Select, MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addCake } from "../api/cake";

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

const CreateCake: React.FC = () => {
const [errorMessage, setErrorMessage] = useState<string>('');
const [formErrors, setFormErrors] = useState<FormErrors>({});
const [formValues, setFormValues] = useState<FormState>({
    name: '',
    comment: '',
    imageUrl: '',
    yumFactor: 0,
  });
const navigate = useNavigate();

  function handleSelectChange(e: SelectChangeEvent<unknown>) {
    setFormValues({
      ...formValues,
      yumFactor: e.target.value as number,
    });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // clear errors
    setFormErrors({});
    let errors: any = {};
    // Validate the formValues
    if (!formValues.name) errors.name = "Cake's name is required";
    
    if (!formValues.comment) {
        errors.comment = "Comment is required";
    } else if (formValues.comment.length < 5) {
        errors.comment = "Comment must be at least 5 characters long";
    } else if (formValues.comment.length > 200) {
        errors.comment = "Comment cannot be more than 200 characters";
    }
    if (!formValues.imageUrl) errors.imageUrl = "Image URL is required";
    if (formValues.yumFactor === 0) errors.yumFactor = "Yum factor is required";

    if (Object.keys(errors).length > 0) {
        
        setFormErrors(errors);
        return;
      }

    try {
        const res = await addCake(formValues);
        if (res.status === 201) {
          navigate('/');
        }
    } catch (err: any) {
        setErrorMessage(err.message); 
    }
  }


  return (
    <Container>
     
      <Container component="main" maxWidth="xs">
        <Box>
            <Typography variant="h3" gutterBottom align="center" color="text.primary">
                Add new cake
            </Typography>
            <Typography sx={{ p: 1, color: "red" }}>{errorMessage}</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid2 container spacing={2}>
                        <Grid2>
                            <TextField
                                required
                                name="name"
                                label="Name"
                                id="name"
                                autoFocus
                                autoComplete="name"
                                onChange={handleInput}
                                value={formValues.name}
                                variant="outlined"
                                error={!!formErrors.name}
                                helperText={formErrors.name}
                                onBlur={() => {
                                    setFormErrors((prev: FormErrors) => ({ ...prev, name: '' }));
                                  }}
                                sx={{
                                    minWidth: 400,
                                    // backgroundColor: 'secondary.main',
                                    '& .MuiOutlinedInput-root': {
                                      backgroundColor: 'background.default', // Adjust background color if needed
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: 'black', // Adjust label color
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused': {
                                      '& fieldset': {
                                        borderColor: 'text.primary', // Adjust the border color when focused
                                      },
                                    },
                                    '& .MuiInputBase-input': {
                                      color: 'text.primary',
                                    },
                                  }}
                            />
                        </Grid2>
                        <Grid2>
                            <TextField
                                required
                                multiline
                                name="comment"
                                label="Comment"
                                id="comment"
                                autoFocus
                                autoComplete="comment"
                                onChange={handleInput}
                                value={formValues.comment}
                                variant="outlined"
                                error={!!formErrors.comment}
                                helperText={formErrors.comment}
                                onBlur={() => {
                                    setFormErrors((prev: FormErrors) => ({ ...prev, comment: '' }));
                                  }}
                                sx={{
                                    minWidth: 400,
                                    // backgroundColor: 'secondary.main',
                                    '& .MuiOutlinedInput-root': {
                                      backgroundColor: 'background.default', // Adjust background color if needed
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: 'black', // Adjust label color
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused': {
                                      '& fieldset': {
                                        borderColor: 'text.primary', // Adjust the border color when focused
                                      },
                                    },
                                    '& .MuiInputBase-input': {
                                      color: 'text.primary',
                                    },
                                  }}
                            />
                        </Grid2>
                        <Grid2>
                            <TextField
                                required
                                name="imageUrl"
                                label="Image URL"
                                id="imageUrl"
                                autoFocus
                                autoComplete="imageUrl"
                                onChange={handleInput}
                                value={formValues.imageUrl}
                                variant="outlined"
                                error={!!formErrors.imageUrl}
                                helperText={formErrors.imageUrl}
                                onBlur={() => {
                                    setFormErrors((prev: FormErrors) => ({ ...prev, imageUrl: '' }));
                                  }}
                                sx={{
                                    minWidth: 400,
                                    // backgroundColor: 'secondary.main',
                                    '& .MuiOutlinedInput-root': {
                                      backgroundColor: 'background.default', // Adjust background color if needed
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: 'black', // Adjust label color
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused': {
                                      '& fieldset': {
                                        borderColor: 'text.primary', // Adjust the border color when focused
                                      },
                                    },
                                    '& .MuiInputBase-input': {
                                      color: 'text.primary',
                                    },
                                  }}
                            />
                        </Grid2>
                    <FormControl     
                        required 
                        fullWidth 
                        sx={{
                            minWidth: 400, 
                            backgroundColor: 'secondary', 
                            '& .MuiInputBase-input': {
                                color: 'text.primary',
                            },
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'background.default', // Adjust background color if needed
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black', // Adjust label color
                            },
                            '& .MuiOutlinedInput-root.Mui-focused': {
                                '& fieldset': {
                                borderColor: 'text.primary', // Adjust the border color when focused
                                },
                            },
                        }} 
                        error={!!formErrors.yumFactor}
                    >
                    
                    <InputLabel id="yumFactor-label" sx={{color: 'text.primary'}}>Yum Factor</InputLabel>
                    <Select
                        required
                        label="Yum Factor"
                        id='yumFactor'
                        value={formValues.yumFactor}
                        onChange={handleSelectChange}
                        onBlur={() => {
                            setFormErrors((prev: FormErrors) => ({ ...prev, yumFactor: '' }));
                          }}
                        error={!!formErrors.yumFactor}
                    >
                        <MenuItem value={1} sx={{ color: 'text.primary', '&:hover': { backgroundColor:'#D1E8E2' } }}>1</MenuItem>
                        <MenuItem value={2} sx={{ color: 'text.primary', '&:hover': { backgroundColor:'#D1E8E2' } }}>2</MenuItem>
                        <MenuItem value={3} sx={{ color: 'text.primary', '&:hover': { backgroundColor:'#D1E8E2' } }}>3 </MenuItem>
                        <MenuItem value={4} sx={{ color: 'text.primary', '&:hover': { backgroundColor:'#D1E8E2' } }}>4</MenuItem>
                        <MenuItem value={5} sx={{ color: 'text.primary', '&:hover': { backgroundColor:'#D1E8E2' } }}>5</MenuItem>
                    </Select>
                    {formErrors.yumFactor && (
                        <Typography variant="body2" color="error">{formErrors.yumFactor}</Typography>
                    )}
                    
                </FormControl>
                    
                </Grid2>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ ml: 2, mt: 3, mb: 2, mr: 2, width: '150px' }}
                    >
                        Add Cake
                    </Button>
                    <Button
                        type="button"
                        color="primary"
                        variant="contained"
                        sx={{ ml: 2,  mt: 3, mb: 2, mr: 2,  width: '150px' }}
                        onClick={() => {navigate("/")}}
                    >
                        Cancel
                    </Button>   
            </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default CreateCake;
