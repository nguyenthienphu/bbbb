import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../layouts/Loading";

const TripName = () => {
    const [TripName, setTripName] = useState(null)
    const [page, setPage] = useState(1)
    const [q] = useSearchParams()

    useEffect(() => {
        const loadTripName = async () => {
            try {
                let e = `${endpoints['TripName']}?page=${page}`

                let kw = q.get('q')
                if (kw !== null)
                    e += `&tripName=${kw}`

                let carnameId = q.get('carnameId')
                if (carnameId !== null)
                    e += `&carName_id=${carnameId}`

                let res = await API.get(e)
                setTripName(res.data.results)
            } catch (ex) {
                setPage(1)
            }

        }
        setTripName(null)
        loadTripName()
    }, [page,q])

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)

    if (TripName === null)
        return <Loading />

    if (TripName.length === 0)
        return <div className="alert alert-info">KHÔNG CÓ CHUYẾN XE NÀO</div>

    return (
        <Container>
            <ButtonGroup aria-label="Basic example">
                <Button onClick={prevPage} variant="secondary">&#9194;</Button>
                <Button onClick={nextPage} variant="secondary">&#9193;</Button>
            </ButtonGroup>
            <Row>
                {TripName.map(c => {
                    let url = `/TripName/${c.id}/Car`
                    return (
                        <Col md={3} xs={12}>
                            <Card>
                                <Card.Img variant="top" src={c.image} />
                                <Card.Body>
                                    <Card.Title>Chuyến Xe</Card.Title>
                                    <Card.Title>{c.tripName}</Card.Title>
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

export default TripName