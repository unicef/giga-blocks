import {  NEWSLETTER } from "../../constants/api";
import { useMutation } from "@tanstack/react-query";
import {apiGuest} from '../../utils/api'

export const useRegistration = () => {
  const registrationMutation = useMutation(async (payload) => {
    const register = await apiGuest.post(NEWSLETTER.REGISTER, payload);
    return register.data;
  });

  return registrationMutation;
};
