import image from '../../assets/images/curve-arrow-pointing-left.png'

const CurveLeftArrow = ({...rest}) => {
    return <img {...rest} src={image} className='cursor-pointer'/>;
}
 
export default CurveLeftArrow;