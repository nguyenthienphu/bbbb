import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../layouts/Loading"
import API, { endpoints } from "../configs/API"
import { Card, Col, Container, Row } from "react-bootstrap"

const Car = () => {
    const [Car, setCar] = useState(null)
    const { TripNameId } = useParams()

    useEffect(() => {
        const loadCar = async () => {
            let res = await API.get(endpoints['Car'](TripNameId))
            setCar(res.data)
        }
        loadCar()
    }, [])

    if (Car === null)
        return <Loading />

    return (
        <Container>
            <h1 className="text-center text-info">CHI TIẾT CHUYẾN XE SỐ {TripNameId}</h1>
            <Row>
                {Car.map(c => {
                    let url = `/Car/${c.id}`
                    return (
                        <Col md={3} xs={12}>
                            <Card>
                                <Card.Img variant="top" src={c.image} />
                                <Card.Body>
                                    <Card.Title>{c.number}</Card.Title>
                                    <Link to={url} className="btn btn-primary">Xem chi tiết</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>

    )

}
export default Car