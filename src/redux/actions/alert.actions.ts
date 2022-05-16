import { alertConstants } from '../../constants';

function success(message: String) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message: String) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}

export const alertActions = {
  success,
  error,
  clear
};
