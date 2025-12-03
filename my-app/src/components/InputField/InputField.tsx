import { FC } from 'react'
import { Button } from 'react-bootstrap'
import './InputField.css'
import { setSearchValue, setMinCoeff, setMaxCoeff } from '../../slices/factorsSlice'

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getDataGrowthFactorsList } from '../../slices/factorsSlice';

interface Props {
    searchValue: string
    minCoeff: string
    maxCoeff: string
    loading?: boolean
}

const InputField: FC<Props> = ({ searchValue, minCoeff, maxCoeff, loading }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <form className="growth-factor-search-form">
            <input value={searchValue} placeholder={"Поиск фактора роста"} onChange={(event => dispatch(setSearchValue(event.target.value)))}/>
            <input value={minCoeff} placeholder={"Коэффициент от"} onChange={(event => dispatch(setMinCoeff(event.target.value)))}/>
            <input value={maxCoeff} placeholder={"Коэффициент до"} onChange={(event => dispatch(setMaxCoeff(event.target.value)))}/>

            <Button disabled={loading} onClick={() => dispatch(getDataGrowthFactorsList())}></Button>
        </form>
    );
};

export default InputField