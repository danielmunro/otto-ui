import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& label': {
    color: '#011627',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: '#011627',
  },
});

export default function TextInput({onChangeValue, ...props}) {
  return <CssTextField
    {...props}
    onChange={(event) => onChangeValue(event.target.value)}
  />
}
