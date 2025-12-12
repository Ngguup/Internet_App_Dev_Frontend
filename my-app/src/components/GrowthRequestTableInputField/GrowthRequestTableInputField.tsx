import { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import './GrowthRequestTableInputField.css'
import { setSearchStatus, setStartDate, setEndDate, setCreatorID } from '../../slices/growthRequestTableSlice'

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getGrowthRequestsList } from '../../slices/growthRequestTableSlice';

interface Props {
    isModerator: boolean
    status: string
    startDate: string
    endDate: string
    creatorID: number | null
    loading?: boolean
}

const GrowthRequestTableInputField: FC<Props> = ({ isModerator, status, startDate, endDate, creatorID, loading }) => {
    const dispatch = useDispatch<AppDispatch>();

    // локальные значения полей
    const [localStatus, setLocalStatus] = useState(status);
    const [localStartDate, setLocalStartDate] = useState(startDate);
    const [localEndDate, setLocalEndDate] = useState(endDate);
    const [localCreatorID, setLocalCreactorID] = useState(creatorID)

    const handleApplyFilters = () => {
        dispatch(setSearchStatus(localStatus));
        dispatch(setStartDate(localStartDate));
        dispatch(setEndDate(localEndDate));
        dispatch(setCreatorID(localCreatorID));

        dispatch(getGrowthRequestsList());
    };

    return (
        <form 
            className="growth-factor-table-search-form" 
            style={{ width: isModerator ? "872px" : "672px" }}
            onSubmit={(e) => e.preventDefault()}
        >
            <input 
                value={localStatus} 
                placeholder="Состояние прогноза" 
                onChange={(e) => setLocalStatus(e.target.value)} 
            />

            <input 
                value={localStartDate} 
                placeholder="Начало периода" 
                onChange={(e) => setLocalStartDate(e.target.value)} 
            />

            <input 
                value={localEndDate} 
                placeholder="Конец периода" 
                onChange={(e) => setLocalEndDate(e.target.value)} 
            />

            {(isModerator) && (
            <input 
                value={localCreatorID ?? ""} 
                placeholder="id Аналитика" 
                onChange={(e) => setLocalCreactorID(Number(e.target.value) || null)} 
            />
            )}

            <Button disabled={loading} onClick={handleApplyFilters}></Button>
        </form>
    );
};

export default GrowthRequestTableInputField;
