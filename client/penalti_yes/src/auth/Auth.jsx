import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginThunk } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const Log = () => {

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const nav = useNavigate()

    useEffect(() => {

    }, [authState])
    console.log(authState.loading)
    console.log(authState.token)

    return (
        authState.error ? <p>{authState.error}</p> :
            authState.loading ? <p>Loading...</p> :
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    gap: '8px'
                }}>
                    <div className='phoneInput'>
                        <PhoneInput
                            international
                            defaultCountry="RU"
                            value={phone}
                            rules={{ required: true }}
                            onChange={setPhone}/>
                    </div>
                    <input value={password} placeholder='Пароль' onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="text" />
                    <button className='btn_add' onClick={() => {
                        if (phone != '' && password!= ''){
                            dispatch(loginThunk({
                                phone: phone.replace("+7",''),
                                password: password
                            }))
                        }
                    }}>Логин</button>
                    <p onClick={()=>{
                        nav('/reg')
                    }}>Регистрация</p>
                </div>
    )
}

export default Log