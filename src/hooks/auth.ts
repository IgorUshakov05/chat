"use client";
import axios from "axios";

interface AuthResult {
  success: boolean;
  id?: string;
}
interface ResultFunctiomAuth extends AuthResult {}
const registerUser = async (
  login: string,
  password: string,
): Promise<ResultFunctiomAuth> => {
  try {
    let sendData = await axios.post<AuthResult>(
      `${process.env.server}/generate`,
      {
        login,
        password,
      },
    );
    let { id, success } = sendData.data;
    console.log(sendData.data);
    return { success, id };
  } catch (error: any) {
    return { success: false };
  }
};

export default registerUser;
