import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { updateUserAsync } from '../../slices/userSlice';
import { useNavigate } from "react-router-dom";
// import Header from "../../components/Header/Header";
import BasicExample from '../../components/BasicExample/BasicExample';
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

const UpdateUserPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ login: '', password: '' });
    const error = useSelector((state: RootState) => state.user.error);
    const login = useSelector((state: RootState) => state.user.login)

    // Обработчик события изменения полей ввода (username и password)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Обработчки события нажатия на кнопку "Войти"
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.login && formData.password) {
            await dispatch(updateUserAsync(formData)); // Отправляем 'thunk'
            navigate(`${ROUTES.DATA_GROWTH_FACTORS}`); // переход на страницу услуг
        }
    };

    return (
        <Container style={{ maxWidth: '100%', marginTop: '0' }}> 
            <BasicExample/>
            <BreadCrumbs
                crumbs={[
                    { label: ROUTE_LABELS.DATA_GROWTH_FACTORS, path: ROUTES.DATA_GROWTH_FACTORS },
                    { label: ROUTE_LABELS.ACCOUNT },
                ]}
            />
            <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Личный кабинет</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        Текущий логин: <strong>{login}</strong>
                    </div>    
                    <Form.Group controlId="login" style={{ marginBottom: '15px' }}>
                        <Form.Label>Новый логин</Form.Label>
                        <Form.Control
                            type="text"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                            placeholder="Введите новый логин"
                        />
                    </Form.Group>
                    <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Введите новый пароль"
                        />
                    </Form.Group>
                    <Button variant="outline-secondary" type="submit" style={{ width: '100%' }}>
                        Обновить
                    </Button>
                </Form>
            </Container>
        </Container>
    );
};

export default UpdateUserPage;