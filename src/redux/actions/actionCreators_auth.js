/* eslint-disable import/prefer-default-export */
import { SET_UID } from '../constans'

export const setUID = (payload) => ({
  type: SET_UID,
  data: {
    uid: payload,
  },
})
