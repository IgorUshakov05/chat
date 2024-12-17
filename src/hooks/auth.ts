"use client";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../lib/firebase"; // Импортируем app
interface AuthResult {
  success: boolean;
  user?: any;
  error?: string;
}

// Сделаем функцию асинхронной
const registerUser = async (
  email: string,
  password: string,
): Promise<AuthResult> => {
  try {
    const auth = getAuth(app); // Используем app из lib/firebase.ts
    const createUser = await createUserWithEmailAndPassword(
      auth,
      email + "@webhunt.ru",
      password,
    );
    console.log("Login: ", email);
    console.log("Password: ", password);
    const user = createUser.user;
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error:error.message };
  }
};

export default registerUser;
