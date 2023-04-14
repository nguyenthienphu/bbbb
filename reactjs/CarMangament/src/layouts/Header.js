import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [CarName, setCarName] = useState([])
    const [q, setQ] = useState()
    const nav = useNavigate()

    useEffect(() => {
        const loadCarName = async () => {
            let res = await API.get(endpoints['CarName'])
            setCarName(res.data)
        }
        loadCarName()
    }, [])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/?q=${q}`)
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="http://localhost:3000/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="http://localhost:3000/">Trang chủ</Nav.Link>
                            {CarName.map(c => {
                                let url = `/?carnameId=${c.id}`
                                return <Link className="nav-link" to={url} >{c.carName}</Link>
                            })}
                            <Nav.Link href="/login">Đăng nhập</Nav.Link>
                        </Nav>
                        <Form onSubmit={search} className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Tên chuyến xe"
                                className="me-2"
                                aria-label="Search"
                                value={q}
                                onChange={(evt) => setQ(evt.target.value)}
                            />
                            <Button type="submit" variant="outline-success">Tìm</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header