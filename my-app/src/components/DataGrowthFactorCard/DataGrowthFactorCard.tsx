import { FC } from 'react'
import { Card } from 'react-bootstrap'
import "./DataGrowthFactorCard.css"
import image from "/DefaultImage.jpg";

interface Props {
    Image: string
    Title: string
    Description: string
    Coeff: number
    imageClickHandler: () => void;
}

export const DataGrowthFactorCard: FC<Props> = ({ Image, Title, Coeff, imageClickHandler}) => (
    <Card className="card text-center">
        <Card.Img className="cardImage" variant="top" src={Image || image} height={182.4} width={182.4} onClick={imageClickHandler} />               
        <Card.Title className='textStyle' style={{ fontWeight: 'bold' }}>{Title}</Card.Title>
        <Card.Text className='textStyle text-center'>Коэффициент: {Coeff}</Card.Text>
        {/* <Button className="cardButton" target="_blank" variant="outline-secondary">Добавить в заявку</Button> */}
    </Card>
)