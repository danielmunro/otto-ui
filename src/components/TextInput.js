import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& label': {
    color: '#011627',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: '#011627',
  },
  '& .MuiOutlinedInput-root': {
  }
});

export default function TextInput({onChangeValue, ...props}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <CssTextField
        {...props}
        onChange={(event) => onChangeValue(event.target.value)}
      />
    </div>
  );
}
