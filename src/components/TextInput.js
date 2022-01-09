import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& label': {
    color: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
});

export default function TextInput({onChangeValue, ...props}) {
  return <CssTextField
    {...props}
    onChange={(event) => onChangeValue(event.target.value)}
  />
}
