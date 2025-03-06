import { useContext, useState } from 'react';
import AppContext from '../../AppContext';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [email, setEmail] = useState("user2@i.ua");
  const [password, setPassword] = useState("123");
  const { setAccessToken, setUser, request } = useContext(AppContext);
  const navigate = useNavigate();

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
      if (data.user) {
        setUser(data.user);
        // setAccessToken(data.accessToken);
        setAccessToken(data.jwtToken);
        navigate('/profile');
      } else {
        console.log("Ошибка на сервере:", data);
      }
    })
      .catch(error => {
        console.log("Ошибка при запросе:", error);
      });
  };

    return <form>
        <input 
            type='email'
            value={email} 
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail" />
          <br/>
          <input 
            type='password'
            value={password} 
            onChange={e => setPassword(e.target.value)}
            placeholder="*********" />
          <br/>
          <button type='button' onClick={sendForm}>Вхід</button>
          
    </form>;
}