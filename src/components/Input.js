

const Input = ({value,styleclass,type,onchange,placeholder,onclick}) => {
    return (
        <>
            <input value={value} className={styleclass} type={type} onChange={onchange} placeholder={placeholder} onClick={onclick} />
        </>
    )
}; 

export default Input;