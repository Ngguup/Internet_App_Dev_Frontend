import { FC } from 'react'
import { Button } from 'react-bootstrap'
import './GrowthRequestTableInputField.css'
import { setSearchStatus, setStartDate, setEndDate } from '../../slices/growthRequestTableSlice'

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getGrowthRequestsList } from '../../slices/growthRequestTableSlice';

interface Props {
    status: string
    startDate: string
    endDate: string
    loading?: boolean
}

const GrowthRequestTableInputField: FC<Props> = ({ status, startDate, endDate, loading }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <form className="growth-factor-search-form">
            <input value={status} placeholder={"Состояние прогноза"} onChange={(event => dispatch(setSearchStatus(event.target.value)))}/>
            <input value={startDate} placeholder={"Начало периода"} onChange={(event => dispatch(setStartDate(event.target.value)))}/>
            <input value={endDate} placeholder={"Конец периода"} onChange={(event => dispatch(setEndDate(event.target.value)))}/>

            <Button disabled={loading} onClick={() => dispatch(getGrowthRequestsList())}></Button>
        </form>
    );
};

export default GrowthRequestTableInputField