import { TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& label': {
    color: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
});

export default function Input({...props}) {
  console.log(props)
  return <CssTextField {...props} />
}
