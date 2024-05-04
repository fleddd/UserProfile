import image from '../../assets/images/delete.png'

const DeleteIMG = ({...rest}) => {
    return <img {...rest} src={image} className='cursor-pointer'/>;
}
 
export default DeleteIMG;