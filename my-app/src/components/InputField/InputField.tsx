import { FC } from 'react'
import { Button } from 'react-bootstrap'
import './InputField.css'

interface Props {
    value: string
    setValue: (value: string) => void
    minCoeff: string
    setMinCoeff: (minCoeff: string) => void
    maxCoeff: string
    setMaxCoeff: (maxCoeff: string) => void

    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
}

const InputField: FC<Props> = ({ value, setValue, minCoeff, setMinCoeff, maxCoeff, setMaxCoeff, onSubmit, loading }) => (
    <form className="growth-factor-search-form">
        <input value={value} placeholder={"Поиск фактора роста"} onChange={(event => setValue(event.target.value))}/>
        <input value={minCoeff} placeholder={"Коэффициент от"} onChange={(event => setMinCoeff(event.target.value))}/>
        <input value={maxCoeff} placeholder={"Коэффициент до"} onChange={(event => setMaxCoeff(event.target.value))}/>

        <Button disabled={loading} onClick={onSubmit}></Button>
    </form>
)

export default InputField