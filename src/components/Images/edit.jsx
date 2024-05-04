import image from '../../assets/images/edit.png'

const EditIcon = ({...rest}) => {
    return <img {...rest} src={image} className='cursor-pointer'/>;
}
 
export default EditIcon;