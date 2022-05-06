import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DiamondIcon from '@mui/icons-material/DiamondOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DiamondColor } from '../enums/DiamondColor.enum';
import { DiamondClarity } from '../enums/DiamondClarity.enum';
import { DiamondCut } from '../enums/DiamondCut.enum';
import { gql, useMutation } from '@apollo/client';
import { DiamondInput } from '../models/Diamond.input';

const CALC_PRICE = gql`
  mutation createDiamond($diamond: DiamondInput!) {
    calcDiamondPrice(diamond: $diamond) {
      id
      price
      caratWeight
      cut
      color
      clarity
    }
  }
`;

export default function CalcPriceForm({ afterDone }: { afterDone: (diamondId: string, price: number) => void }) {
    const [color, setColor] = React.useState('');
    const [clarity, setClarity] = React.useState('');
    const [cut, setCut] = React.useState('');
    const [caratWeight, setCaratWeight] = React.useState('');

    const [calcPriceMutation, { data:mutationResult, loading, error }] = useMutation(CALC_PRICE);
    
    useEffect(() => {
      if(mutationResult && mutationResult.calcDiamondPrice){
          const {id:diamondId, price} = mutationResult.calcDiamondPrice;
          afterDone(diamondId,price);
      }
    }, [mutationResult])


    if (loading) return <div>Submitting...</div>;
    if (error) return <div>{`Submission error! ${error.message}`}</div>;
  
    

    const handleColorChange = (event: SelectChangeEvent) => {
        setColor(event.target.value);
    }

    const handleClarityChange = (event: SelectChangeEvent) => {
        setClarity(event.target.value);
    }

    const handleCutChange = (event: SelectChangeEvent) => {
        setCut(event.target.value);
    }

    const handleCaratWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCaratWeight(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const diamond:DiamondInput = {
            color: DiamondColor[color as keyof typeof DiamondColor],
            cut: DiamondCut[cut as keyof typeof DiamondCut],
            clarity: DiamondClarity[clarity as keyof typeof DiamondClarity],
            caratWeight: parseFloat(caratWeight)
        };
        calcPriceMutation({variables: {diamond}});
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <DiamondIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Check Price
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth>
                                <InputLabel id="color-label">Color</InputLabel>
                                <Select
                                    labelId="color-label"
                                    id="color"
                                    value={color}
                                    label="Color *"
                                    onChange={handleColorChange}
                                >
                                    {
                                        Object.entries(DiamondColor).map(([key, value]) =>
                                            <MenuItem key={key} value={value}>{key}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth>
                                <InputLabel id="clarity-label">Clarity</InputLabel>
                                <Select
                                    labelId="clarity-label"
                                    id="clarity"
                                    value={clarity}
                                    label="Clarity *"
                                    onChange={handleClarityChange}
                                >
                                    {
                                        Object.entries(DiamondClarity).map(([key, value]) =>
                                            <MenuItem key={key} value={value}>{key}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required fullWidth>
                                <InputLabel id="cut-label">Cut</InputLabel>
                                <Select
                                    labelId="cut-label"
                                    id="cut"
                                    value={cut}
                                    label="Cut *"
                                    onChange={handleCutChange}
                                >
                                    {
                                        Object.entries(DiamondCut).map(([key, value]) =>
                                            <MenuItem key={key} value={value}>{key}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="carat-wieght"
                                type="number"
                                label="Carat Weight"
                                value={caratWeight}
                                onChange={handleCaratWeightChange} />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Check Price
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
