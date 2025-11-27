import { FC } from 'react'
import { Card } from 'react-bootstrap'
import "./DataGrowthFactorCard.css"
import default_image from "/DefaultImage.jpg";
import { DsDataGrowthFactor } from '../../api/Api';

// interface Props {
//     image: string
//     title: string
//     description: string
//     coeff: number
//     imageClickHandler: () => void;
// }
interface Props extends DsDataGrowthFactor {
    imageClickHandler: () => void
}


export const DataGrowthFactorCard: FC<Props> = ({ image, title, coeff, imageClickHandler}) => (
    <Card className="card text-center">
        <Card.Img className="cardImage" variant="top" src={image || default_image} height={182.4} width={182.4} onClick={imageClickHandler} />               
        <Card.Title className='textStyle' style={{ fontWeight: 'bold' }}>{title}</Card.Title>
        <Card.Text className='textStyle text-center'>Коэффициент: {coeff}</Card.Text>
        {/* <Button className="cardButton" target="_blank" variant="outline-secondary">Добавить в заявку</Button> */}
    </Card>
)