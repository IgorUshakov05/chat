import {
  getAuth,
  signInWithCustomToken,
  onAuthStateChanged,
} from "firebase/auth";

const sendAuthRequest = async () => {
  const auth = getAuth();

  // Получаем токен из localStorage
  const accessToken = localStorage.getItem("access");

  // Если токена нет, выходим
  if (!accessToken) {
    console.error("Токен не найден в localStorage");
    return { success: false, error: "Токен не найден" };
  }

  try {
    // Попытка авторизации с Custom Token
    const userCredential = await signInWithCustomToken(auth, accessToken);
    const user = userCredential.user;

    console.log("Пользователь успешно авторизован:", user);
    return { success: true, user };
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    return { success: false, error };
  }
};

// Проверка состояния авторизации
export const checkAuthState = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Текущий пользователь:", user);
    } else {
      console.log("Пользователь не авторизован");
    }
  });
};

export default { sendAuthRequest, checkAuthState };
