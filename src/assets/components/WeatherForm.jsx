
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const WeatherForm=({city, onCityChange, onSubmit, error, loading})=>{
    return(
        <Box
        sx={{ display: "grid", gap: 2 }}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="city"
          label="Ciudad"
          variant="outlined"
          size="small"
          required
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          error={error.error}
          helperText={error.message}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Buscando..."
        >
          Buscar
        </LoadingButton>
      </Box>
    )
}
export default WeatherForm;
