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
  return axios.post(BASE_URL + "/user/login/", data);
};

type accessTokenType = {
access: string;

}
type refreshTokenType = {
refresh: string;
}

type tokensType = accessTokenType & refreshTokenType
export const getTokens = (data: authUserProps): Promise<tokensType> => {
  return axios.post(BASE_URL + "/user/token/", data).then((res) => res.data);
};
export const refreshToken = (refresh: string): Promise<accessTokenType> => {
  return axios.post(BASE_URL + "/user/token/refresh/", { refresh }).then((res) => res.data);
};