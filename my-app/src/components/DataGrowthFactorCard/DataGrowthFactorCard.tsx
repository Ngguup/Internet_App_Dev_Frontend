import { FC } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import "./DataGrowthFactorCard.css"
import default_image from "/DefaultImage.jpg";
import { DsDataGrowthFactor } from '../../api/Api';

import { useLocation } from 'react-router-dom';

import { addCityToGrowthRequest, } from '../../slices/growthRequestDraftSlice';
import { getDataGrowthFactorsList } from '../../slices/factorsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteCityFromGrowthRequest, setFactors } from '../../slices/growthRequestDraftSlice';
import { DataGrowthFactor } from '../../slices/growthRequestDraftSlice';

// interface Props {
//     image: string
//     title: string
//     description: string
//     coeff: number
//     imageClickHandler: () => void;
// }
interface Props extends DsDataGrowthFactor {
    imageClickHandler: () => void
    factors?: DataGrowthFactor[]
    app_id?: string
    isDraft?: boolean;
}


export const DataGrowthFactorCard: FC<Props> = ({ id, image, title, coeff, imageClickHandler, factors, app_id, isDraft}) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    // Обработчик события нажатия на кнопку "Добавить"
    const handleAdd = async () => {
        if (id) {
            await dispatch(addCityToGrowthRequest(id!));
            await dispatch(getDataGrowthFactorsList()); // Для обновления отображения состояния иконки "корзины" 
        }
    }

    const handleDelete = async () => {
        if (id && app_id) {
            await dispatch(deleteCityFromGrowthRequest(id));
            dispatch(setFactors(factors!.filter(factor => factor.ID !== id)));
        }
    }

    const handleFactorNumChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (id && factors) {
            const { name, value } = e.target;
            dispatch(
                setFactors(
                factors.map((factor) =>
                    factor.ID === id ? {
                        ...factor,
                        [name]: value,
                    }: factor
                ))
            );
        }
    };

    
    if (pathname === "/factors") {
        return (
            <Card className="card text-center">
                <Card.Img className="cardImage" variant="top" src={image || default_image} height={182.4} width={182.4} onClick={imageClickHandler} />               
                <Card.Title className='textStyle' style={{ fontWeight: 'bold' }}>{title}</Card.Title>
                <Card.Text className='textStyle text-center'>Коэффициент: {coeff}</Card.Text>
                {/* <Button className="cardButton" target="_blank" variant="outline-secondary">Добавить в заявку</Button> */}
                {(isAuthenticated == true ) && (
                    <Button className="cardButton" variant="outline-secondary" onClick={() => handleAdd() }>
                        Добавить
                    </Button>
                )}
            </Card>
        );
    }

    if (pathname.includes("/vacancy_application")) {
        return (
            <div className="data-growth-factor-card">
                {/* <div className="aligned-text-hor">
                    <p>{ title }:</p> <p className="input ms-2">{ factorNum }</p>
                </div> */}
                {(isDraft) ? (
                <>
                    <Form.Group controlId="FactorNum" className="aligned-text-hor">
                        <p>{ title }</p>
                    <Form.Control
                        className="input ms-2"
                        type="text"
                        name="FactorNum"
                        value={factors && id ? factors.find(f => f.ID === id)!.FactorNum : '1'}
                        onChange={handleFactorNumChange}
                        required
                        // disabled={!isDraft}
                    />
                    </Form.Group>
                </>) : (
                    <p>{title}: {factors && id ? factors.find(f => f.ID === id)!.FactorNum : '1'}</p>
                )}

                <div className="data-growth-factor-card-field">
                    <img className="data-growth-factor-card-img" src={image || default_image} alt={title}/>
                    <p>Коэффициент: { coeff }</p>
                </div>

                {(isDraft) && (
                    <button className="delete-factor-btn" onClick={handleDelete}></button>
                )}
            </div>
            //   <div className="fav-card">
            //     {(isDraft) && (
            //         <Button className="fav-btn-open" onClick={() => handleDeleteCity()}>
            //             Удалить
            //         </Button>
            //     )}
            //     <Row>
            //         <Col xs={2} sm={2} md={2}>
            //             <div className="d-flex justify-center">
            //                 <img src={image || default_image} alt={title} />
            //             </div>
            //         </Col>
            //         <Col xs={10} sm={10} md={10}>
            //             <div className="fav-card-body">
            //                 <h5>{title}</h5>
            //                 <div className="form-group">
            //                     <Row>
            //                         <Col xs={3} sm={3} md={3}>
            //                             <label className="form-label">Количество вакансий: </label>
            //                         </Col>
            //                         <Col xs={9} sm={9} md={9}>
            //                             <input
            //                                 type="number"
            //                                 className="localcount"
            //                                 value={0}
            //                                 disabled
            //                             />
            //                         </Col>
            //                     </Row>
            //                 </div>
            //                 <Row>
            //                     <Col md={3} xs={3}>
            //                         <a onClick={() => imageClickHandler()} className="fav-btn-open">
            //                             Подробнее
            //                         </a>
            //                     </Col>
            //                     <Col md={3} xs={3}>
            //                     </Col>
            //                 </Row>
            //             </div>
            //         </Col>
            //     </Row>
            // </div>
        );
    }
};