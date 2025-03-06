import { useContext, useState } from 'react';
import AppContext from '../../AppContext';

export default function Profile() {    
    const {user, setUser} = useContext(AppContext);
    return user == null ? <AnonView /> : <AuthView />;
}

function AuthView() {
    const {user, setUser,request, setAccessToken, accessToken} = useContext(AppContext);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [city, setCity] = useState(user.city);

    const saveChanges = () => {
        request('/user',{
         method:'PUT',
        headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                "userId": user.userId,
                name,
                phone,
                city
            })
            }).then(data => { 
                console.log(data);
                console.log('Пользователь обновлен:', data);
                setUser(data);
            }).catch(err => console.log(err));
        console.log( user.userId, name, phone, city );
    };

    const deleteProfile = () => {
        if (confirm("Taki da?")) { 
            request('/user?id=' + user.userId, {
                method: 'DELETE',
            }).then(data => {
                console.log(data);
                setUser(null);
                setAccessToken(null);
              //  setCity(null);
            }).catch(err => console.log(err));
        }
        console.log( user.userId, 'DEL' );
    };

    return <> <i>{JSON.stringify(accessToken)}</i>
    Справжнє ім'я: <input type='text' value={name} onChange={e => setName(e.target.value)} />
    <br/>
    email: {user.email}
    <br/>
    Телефон: <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
        <br />
    CITY: <input type='text' value={city} onChange={e => setCity(e.target.value)} />
        <br />
    <button onClick={saveChanges}>Зберегти</button>
    <br/>
    <button onClick={deleteProfile}>Видалити обліковий запис</button>
    </>;
}

function AnonView() {
    return <p>Авторизуйтесь для перегляду профілю</p>;
}
/*
Доповнити профіль користувача даними з попереднього ДЗ
Обрати які з них можуть бути змінені, які ні. 
*/