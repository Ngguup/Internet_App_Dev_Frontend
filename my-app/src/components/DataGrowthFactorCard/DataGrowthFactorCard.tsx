import { FC } from 'react'
import { Card } from 'react-bootstrap'
import "./DataGrowthFactorCard.css"
import default_image from "/DefaultImage.jpg";
import { DsDataGrowthFactor } from '../../api/Api';

import { useLocation } from 'react-router-dom';

import { addCityToVacancyApplication, } from '../../slices/vacancyApplicationDraftSlice';
import { getCitiesList } from '../../slices/citiesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteCityFromVacancyApplication, setCities } from '../../slices/vacancyApplicationDraftSlice';

// interface Props {
//     image: string
//     title: string
//     description: string
//     coeff: number
//     imageClickHandler: () => void;
// }
interface Props extends DsDataGrowthFactor {
    imageClickHandler: () => void
    isDraft?: boolean;
}


export const DataGrowthFactorCard: FC<Props> = ({ image, title, coeff, imageClickHandler, isDraft}) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    // Обработчик события нажатия на кнопку "Добавить"
    const handleAdd = async () => {
        if (city_id) {
            await dispatch(addCityToVacancyApplication(city_id));
            await dispatch(getCitiesList()); // Для обновления отображения состояния иконки "корзины" 
        }
    }

    const handleDeleteCity = async () => {
        if (city_id && app_id) {
            await dispatch(deleteCityFromVacancyApplication({ appId: app_id, cityId: city_id }));
            dispatch(setCities(cities.filter(city => city.city_id?.city_id !== city_id)));
        }
    }
    
    if (pathname === "/cities") {
        return (
            <Card className="card text-center">
                <Card.Img className="cardImage" variant="top" src={image || default_image} height={182.4} width={182.4} onClick={imageClickHandler} />               
                <Card.Title className='textStyle' style={{ fontWeight: 'bold' }}>{title}</Card.Title>
                <Card.Text className='textStyle text-center'>Коэффициент: {coeff}</Card.Text>
                {/* <Button className="cardButton" target="_blank" variant="outline-secondary">Добавить в заявку</Button> */}
                {(isAuthenticated == true ) && (
                    <Button className="city-btn" onClick={() => handleAdd() }>
                        Добавить
                    </Button>
                )}
            </Card>
        );
    }

    if (pathname.includes("/vacancy_application")) {
        return (
            <div className="fav-card">
                {(isDraft) && (
                    <Button className="fav-btn-open" onClick={() => handleDeleteCity()}>
                        Удалить
                    </Button>
                )}
                <Row>
                    <Col xs={2} sm={2} md={2}>
                        <div className="d-flex justify-center">
                            <img src={url || defaultImage} alt={city_name} />
                        </div>
                    </Col>
                    <Col xs={10} sm={10} md={10}>
                        <div className="fav-card-body">
                            <h5>{city_name}</h5>
                            <div className="form-group">
                                <Row>
                                    <Col xs={3} sm={3} md={3}>
                                        <label className="form-label">Количество вакансий: </label>
                                    </Col>
                                    <Col xs={9} sm={9} md={9}>
                                        <input
                                            type="number"
                                            className="localcount"
                                            value={count}
                                            disabled
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col md={3} xs={3}>
                                    <a onClick={() => imageClickHandler()} className="fav-btn-open">
                                        Подробнее
                                    </a>
                                </Col>
                                <Col md={3} xs={3}>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
};