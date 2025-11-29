import './BasicExample.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, NavLink } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../../store';
import { logoutUserAsync } from '../../slices/userSlice'; 
import { setSearchValue, getDataGrowthFactorsList } from '../../slices/citiesSlice'; 
import { ROUTES } from '../../Routes';

function BasicExample() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated); // получение из стора значения флага состояния приложения
  const login = useSelector((state: RootState) => state.user.login); // получение значения username из стора
  // Обработчик события нажатия на кнопку "Выйти"
  const handleExit = async ()  => {
      await dispatch(logoutUserAsync());

      dispatch(setSearchValue('')); // можно реализовать в `extrareducers` у функции logoutUserAsynс
      
      navigate('/factors'); // переход на страницу списка услуг

      await dispatch(getDataGrowthFactorsList()); // для показа очищения поля поиска
  }

  return (
    <header>
      <Navbar expand="lg" className='header' fixed='top'>
            {/* <Navbar.Brand href="/Internet_App_Dev_Frontend/" className='center-btn'>Прогноз роста объема данных</Navbar.Brand>
            <Nav.Link href="/Internet_App_Dev_Frontend/factors" className='nav-link-hidden'>Фаторы роста</Nav.Link> */}
            <Navbar.Brand as={Link} to={ROUTES.HOME} className='center-btn'>
              Прогноз роста объема данных
            </Navbar.Brand>

            <Nav.Link as={Link} to={ROUTES.DATA_GROWTH_FACTORS} className='nav-link-hidden'>
              Факторы роста
            </Nav.Link>

            {(isAuthenticated == false ) && (
                <Link to={ROUTES.LOGIN}>
                    <Button className="login-btn">Войти</Button>
                </Link>
            )}

            {(isAuthenticated == true) && (
                <Button variant="primary" type="submit" className="login-btn" onClick={ handleExit }>
                    Выйти
                </Button>
            )}

            {/* <NavLink to={Страница личного кабинета пользователя} className='nav__link'>{ username }</NavLink>        */}
      </Navbar>
    </header>
  );
}

export default BasicExample;