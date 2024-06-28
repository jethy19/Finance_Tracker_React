import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function removeCookies(name) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}


function LogoutTimer({ timeout }) {
  const navigation = useNavigate();

  useEffect(() => {
    let timer;
    const resetTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(logout, timeout);
    };

    const logout = () => {
      // Perform logout logic here
      removeCookies("token");
      removeCookies("uname");
      removeCookies("goal");
      localStorage.removeItem("localgoal");
      navigation("/");
      window.location.reload();
    };

    const handleUserActivity = () => {
      resetTimer();
    };

    const startTimer = () => {
      resetTimer();
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keypress', handleUserActivity);
    };

    startTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
    };
  }, [timeout, navigation]);

  return null;
}

export default LogoutTimer;
