const Avatar = ({src}) => {
    return (
       <>
            <img width={45} height={45} alt='avatar' src={src} className='rounded-[50%] object-cover' />
       </>
    );
}
 
export default Avatar;