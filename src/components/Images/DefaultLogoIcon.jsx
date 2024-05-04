import image from '../../assets/images/defaultLogo.png'

const DefaultLogoIcon = ({size = 45}) => {
    return (
       <>
            <img width={size} height={size} alt='defaultLogo' src={image} className='rounded-[50%] object-cover' />
       </>
    );
}
 
export default DefaultLogoIcon;