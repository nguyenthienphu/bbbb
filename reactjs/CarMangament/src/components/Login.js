import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import API, { authAPI, endpoints } from "../configs/API"


const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const login = (evt) => {
        evt.preventDefault()

        const process = async () => {
            let res = await API.post(endpoints['Login'], {
                'grant_type': 'password',
                'username': username,
                'password': password,
                'client_id': 'QJST2N0AN68ZytLefdHXDmApgXhHhVCuGSUniunp',
                'client_secret': '8Py7Of1Zf7FTtg4u3731ykfyKcBVbgTAIfh1wlbeBrnKdBeT3Ytcwfe33KFgMomO72U2elDAdJquSX3WEINQMfnkFxGNvmOzMVXi7VS91IS5n8r9yPgWCOPrW0wLsJqe'
            })
            
            


            
        }

        process()
    }

    return (
        <>
            <h1 className="text-center text-success">ĐĂNG NHẬP NGƯỜI DÙNG</h1>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tên đăng nhập </Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} 
                                    placeholder="Tên đăng nhập..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu </Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} 
                                    placeholder="Mật khẩu..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        </>
    )
}

export default Login