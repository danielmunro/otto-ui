import {
  CHANGE_POST_MESSAGE,
  SUBMIT_POST_MESSAGE,
  SUBMIT_POST_MESSAGE_ERROR,
  SUBMIT_POST_MESSAGE_SUCCESS,
} from './constants';

export function changePostMessage(message) {
  return {
    type: CHANGE_POST_MESSAGE,
    message,
  };
}

export function submitPostMessage() {
  return {
    type: SUBMIT_POST_MESSAGE,
  };
}

export function postMessageSubmittedSuccess() {
  return {
    type: SUBMIT_POST_MESSAGE_SUCCESS,
  };
}

export function postMessageSubmittedError() {
  return {
    type: SUBMIT_POST_MESSAGE_ERROR,
  };
}
