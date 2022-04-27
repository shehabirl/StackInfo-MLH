import './CustomBtn.css';
const CustomBtn = ({onClick, ButtonText})=>{
    return (
        <div className={'CustomBtnWrapper'} onClick={onClick}>
            <button type={'button'} className={'CustomBtn'}>
                <span>{ButtonText}</span>
            </button>
        </div>
    )
}

export default CustomBtn;