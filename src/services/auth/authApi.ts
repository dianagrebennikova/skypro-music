
import { BASE_URL } from "../constants/constants";
import axios, { AxiosResponse } from "axios";

type authUserProps = {
  email: string;
  password: string;
};

type authUserReturn = {
  email: string;
  username: string;
  _id: number;
};

export const authUser = (data: authUserProps): Promise<AxiosResponse<authUserReturn>> => {
  return axios.post(BASE_URL + "/user/login/", data, {
    headers: {
      "content-type": "application/json",
    },
  });
};
