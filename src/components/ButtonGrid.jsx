const ButtonGrid = ({text, onClick, styles} ) => {
    return <button type="button" onClick={onClick} className={`px-3 py-3 font-bold text-sm bg-blue-600 rounded-2xl hover:scale-95 transition-all ease text-white ${styles}`}>{text}</button>;
}
 
export default ButtonGrid;