import cck from '../Asset/cck.png'

export default function About() {
    return (
      <section id="about" className='about'>
        <div className= " container mx-auto   flex flex-col md:flex-row items-center justify-between  gap-5 mb-6">
          <div className="max-w-sm   lg:max-w-2xl   ">
            <h2 className="text-4xl font-fntsecondary text-pink-500 mb-6  ">About Us</h2>
            <p className="text-gray-700 leading-relaxed  ">
              We believe that every cake should be as unique as the celebration it represents. Our team of expert bakers and cake artists work closely with you to bring your cake vision to life. Using the freshest ingredients and innovative techniques, we craft cakes that not only taste delicious but look stunning as well.
            </p>
          </div>
          <div className="  flex items-center justify-center">
            <img 
              src= {cck}
              alt="Delicious cheesecake" 
              className="w-[400px] md:w-full flex justify-center items-center ml-8 md:ml-0"
            />
          </div>
        </div>
      </section>
    );
  }