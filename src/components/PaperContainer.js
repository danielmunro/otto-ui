import { Paper } from '@mui/material';

export default function PaperContainer({ children }) {
  return (
    <Paper sx={{p: 1, mb: 1, width: "100%"}}>
      {children}
    </Paper>
  );
}
