import './style.css'
import Image from '../../public/images/Dropitemsimg/Option_2-min_1.webp';
const Featured = () => {
  return (
    <div className='filter_item mr-20'>
      <h4 className='filter_heading gray-text'>FEATURED</h4>
      <div>
        <img className='w-[20%]' src={Image} alt='' />
      </div>
      <p className='text-2xl'>Fornasetti Senza Tempo II</p>
      <p className='gray-text text-xl cursor-pointer'>View The Collection</p>
    </div>
  );
};

export default Featured;
