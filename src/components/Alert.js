import { Alert as MuiAlert } from '@mui/material';

export default function Alert({ severity, children }) {
  return (
    <div style={{marginBottom: 10}}>
      <MuiAlert severity={severity}>
        {children}
      </MuiAlert>
    </div>
  );
}
