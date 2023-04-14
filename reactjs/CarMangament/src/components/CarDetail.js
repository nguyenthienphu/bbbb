import { useEffect, useState } from "react"
import Loading from "../layouts/Loading"
import API, { endpoints } from "../configs/API"
import { useParams } from "react-router-dom"
import { Card } from "react-bootstrap"

const CarDetail = () => {
    const [Car, setCar] = useState(null)
    const { CarId } = useParams()

    useEffect(() => {
        let loadCar = async () => {
            let res = await API.get(endpoints['Car-Detail'](CarId))
            setCar(res.data)
        }
        loadCar()
    }, [])

    if (Car === null)
        return <Loading />
    return (
        <>
            <h1 className="text-center text-success">{Car.number}</h1>
            <Card>
                <Card.Img width="200" src={Car.image} />
            </Card>
            <p>{Car.image}</p>
            <p>{Car.description}</p>
            <p>{Car.startDate}</p>

        </>
    )
}
export default CarDetail