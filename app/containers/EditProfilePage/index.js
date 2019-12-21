import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import H1 from '../../components/H1';
import noImage from '../../images/no-image.png';
import history from '../../utils/history';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { makeSelectIsUserLoaded, makeSelectUser } from './selectors';
import style from './style';
import {
  changeBioMessage,
  changeBirthday,
  changeName,
  editProfileLoad,
  editProfileUserSubmit,
} from './actions';
import messages from './messages';
import { makeSelectSessionUser } from '../App/selectors';

const key = 'edit-profile-page';

function EditProfilePage({
  globalUser,
  user,
  isUserLoaded,
  onSubmitForm,
  onLoad,
  onChangeName,
  onChangeBirthday,
  onChangeBioMessage,
}) {
  const classes = style();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    if (!isUserLoaded) {
      onLoad(globalUser);
    }
  });
  if (!isUserLoaded) {
    return <span />;
  }
  return (
    <Grid container>
      <Grid item xs={2}>
        <img
          src={user.profilePic || noImage}
          alt={`${user.username}'s profile`}
          width="100%"
        />
      </Grid>
      <Grid item xs={6}>
        <H1>
          <FormattedMessage
            {...messages.editProfileHeader}
            values={{ username: user.username ? user.username : '' }}
          />
        </H1>
        <form onSubmit={evt => onSubmitForm(evt, user)}>
          <TextField
            value={user.username}
            readOnly
            className={classes.textField}
            label={messages.username.defaultMessage}
          />
          <TextField
            className={classes.textField}
            value={user.name}
            label={messages.name.defaultMessage}
            onChange={onChangeName}
          />
          <TextField
            className={classes.textField}
            value={user.birthday}
            label={messages.birthday.defaultMessage}
            onChange={onChangeBirthday}
          />
          <TextField
            className={classes.textField}
            multiline
            rows={5}
            value={user.bio_message}
            label={messages.bioMessage.defaultMessage}
            onChange={onChangeBioMessage}
          />
          <Grid container>
            <Grid item xs={3}>
              <Button id="cancel" onClick={() => history.goBack()}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button id="submit" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

EditProfilePage.propTypes = {
  globalUser: PropTypes.object,
  user: PropTypes.object,
  isUserLoaded: PropTypes.bool,
  onSubmitForm: PropTypes.func,
  onLoad: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeBirthday: PropTypes.func,
  onChangeBioMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  globalUser: makeSelectSessionUser(),
  user: makeSelectUser(),
  isUserLoaded: makeSelectIsUserLoaded(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeName: evt => dispatch(changeName(evt.target.value)),
    onChangeBirthday: evt => dispatch(changeBirthday(evt.target.value)),
    onChangeBioMessage: evt => dispatch(changeBioMessage(evt.target.value)),
    onLoad: user => dispatch(editProfileLoad(user)),
    onSubmitForm: (evt, user) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(editProfileUserSubmit(user));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditProfilePage);
