import { useContext, useState } from 'react';
import AppContext from '../../AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Signin() {
  const [email, setEmail] = useState("user2@i.ua");
  const [password, setPassword] = useState("123");
  const { setAccessToken, setUser, request } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const sendForm = () => {
    // rfc7617
    let data = email + ':' + password;
    let credentials = btoa(data);
    request('/user', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + credentials,
      },
    }).then(data => {
      console.log("Ответ от сервера:", data);
      if (data && data.user && data.jwtToken) {
        setUser(data.user);
        // setAccessToken(data.accessToken);
        setAccessToken(data.jwtToken);
        console.log("JWT Token: ", data.jwtToken)
        //если есть токен то направляем на ту страницу откуда пришли,а то сразу идет переход на профиль
        const from = location.state?.from || '/';
        navigate(from);
        // navigate('/profile');
        decodeJwt(data.jwtToken);
      } else {
        console.log("Ошибка на сервере, не пришел токен", data);
      }
    })
      .catch(error => {
        console.log("Ошибка при запросе:", error);
      });
  };
  const decodeJwt = (token) => {
    if (!token) {
      console.error("empty token");
      return null;
    }
    try {
      const base64Url = token.split('.')[1]; // берём часть токена payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));

      const payload = JSON.parse(jsonPayload);

      console.log("Токен:", payload);
      console.log("Issued at (iat):", new Date(payload.iat * 1000));
      console.log("Expiration (exp):", new Date(payload.exp * 1000));

      return payload;
    } catch (error) {
      console.error("Ошибка декодирования JWT:", error);
      return null;
    }
  };


  return <form>
    <input
      type='email'
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder="E-mail" />
    <br />
    <input
      type='password'
      value={password}
      onChange={e => setPassword(e.target.value)}
      placeholder="*********" />
    <br />
    <button type='button' onClick={sendForm}>Вхід</button>

  </form>;
}