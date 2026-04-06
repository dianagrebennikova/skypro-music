import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "../constants/constants";

type regUserProps = {
  email: string;
  password: string;
  username: string;
};

type regUserReturn = {
  message: string;
  result: {
    email: string;
    username: string;
    _id: number;
  };
  success: boolean;
};

export const RegUser = (data: regUserProps): Promise<AxiosResponse<regUserReturn>> => {
  return axios.post(BASE_URL + "/user/signup/", data, {
    headers: {
      "content-type": "application/json",
    },
  });
};
