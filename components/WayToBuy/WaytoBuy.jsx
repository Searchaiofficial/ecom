"use client";
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import './waytobuy.css';


function WaytoBuy() {

  const [selectedButton, setSelectedButton] = useState(null);
  const [inputValue, setInputValue] = useState(10000);
  const [tempInputValue, setTempInputValue] = useState('10000');

  const handleInputChange = (event) => {
    setTempInputValue(event.target.value);
  };

  const handleCalculateClick = () => {
    setInputValue(parseInt(tempInputValue) || 0);
    // console.log('Calculated value:', inputValue);
  };

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  return (

    <>
      <div className='p-5'>

        <div className="text-center mt-24 overflow-hidden">
          <div className='relative box-width mx-auto' >
            <div>
              <h1 className=" typography-headline text-6xl leading-tight font-semibold tracking-tighter font-sans">
                The best ways to buy from Ayatrio.
              </h1>
              <p className='typography-para mt-8 text-2xl dd-compact-large-15  font-normal tracking-normal font-sans'>Shop at Ayatrio in a way that suits you. Enjoy up to ₹8000.00 instant savings on eligible products with HDFC Bank credit cards.§§ Plus No Cost EMI from most leading banks.§</p>
              <p className='typography-para mt-6 text-2xl dd-compact-large-15  font-normal tracking-normal font-sans'>Trade in your smartphone online or in-store for instant credit towards your new iPhone. And, get instant credit when you exchange an eligible Mac, iPad or Ayatrio Watch at the Ayatrio Store. Footnote *</p>
            </div>
            <div>
              {/* <Image width={1827} height={437} src='/Waytobuys/Ayatrio1.jpg' /> */}
            </div>
          </div>
        </div>


        <div className='text-center my-20'>
          <div className='mx-auto max-w-5xl'>
            <div className='text-5xl leading-tight font-semibold tracking-tighter font-sans'>
              <h2 className='typography-headline'>Special Offers.</h2>
            </div>
            <div className='mt-8 md:mt-14'>
              <div className='flex justify-center flex-wrap flex-col md:flex-row w-full'>

                <div className='box-border m-0 p-0 min-w-0 w-full md:w-2/5'>
                  <div className='mx-auto w-3/5'>
                    <h3 className='text-2xl font-bold mt-4'>iPhone Offers</h3>
                    <p className='mt-2'>Phone 15 Pro and iPhone 15 Pro Max - ₹6000.00
                      <br />iPhone 15 and iPhone 15 Plus - ₹5000.00
                      <br />iPhone 14 and iPhone 14 Plus - ₹4000.00
                      <br />iPhone 13 - ₹3000.00
                      <br />iPhone SE - ₹2000.00
                    </p>
                    <p className='mt-2'>
                      <a className='text-blue-600 font-semibold' href="#">Shop iPhone </a>
                      <Image width={150} height={25} alt='hdfc' className='mx-auto pt-4' src="/images/Waytobuy/hdfc.jpg" />
                    </p>
                  </div>
                </div>

                <div className='box-border m-0 p-0 min-w-0 w-full md:w-2/5'>
                  <div className='mx-auto w-3/5'>
                    <h3 className='text-2xl font-bold mt-4'>iPhone Offers</h3>
                    <p className='mt-2'>Phone 15 Pro and iPhone 15 Pro Max - ₹6000.00
                      <br />iPhone 15 and iPhone 15 Plus - ₹5000.00
                      <br />iPhone 14 and iPhone 14 Plus - ₹4000.00
                      <br />iPhone 13 - ₹3000.00
                      <br />iPhone SE - ₹2000.00
                    </p>
                    <p className='mt-2'>
                      <a className='text-blue-600 font-semibold' href="#">Shop iPhone </a>
                      <Image width={150} height={25} alt='hdfc' className='mx-auto pt-4' src="/images/Waytobuy/hdfc.jpg" />
                    </p>
                  </div>
                </div>

              </div>
            </div>
            {/* second row  */}
            <div className=' mt-8 md:mt-14'>
              <div className='flex justify-center flex-wrap flex-col md:flex-row w-full'>

                <div className='box-border m-0 p-0 min-w-0 w-full md:w-2/5'>
                  <div className='mx-auto w-3/5'>
                    <h3 className='text-2xl font-bold mt-4'>iPad Offers</h3>
                    <p className='mt-2'>iPad Pro 12.9" - ₹4000.00
                      <br />iPad Pro 11" - ₹3000.00
                      <br />iPad Air - ₹3000.00
                      <br />iPad (10th generation) - ₹3000.00
                      <br />iPad (9th generation) - ₹2000.00
                      <br /> iPad mini - ₹2000.00
                    </p>
                    <p className='mt-2'>
                      <a className='text-blue-600 font-semibold' href="#">Shop iPad </a>
                      <Image width={150} height={25} alt='hdfc' className='mx-auto pt-4' src="/images/Waytobuy/hdfc.jpg" />
                    </p>
                  </div>
                </div>

                <div className='box-border m-0 p-0 min-w-0 w-full md:w-2/5'>
                  <div className='mx-auto w-3/5'>
                    <h3 className='text-2xl font-bold mt-4'>iPad Offers</h3>
                    <p className='mt-2'>iPad Pro 12.9" - ₹4000.00
                      <br />iPad Pro 11" - ₹3000.00
                      <br />iPad Air - ₹3000.00
                      <br />iPad (10th generation) - ₹3000.00
                      <br />iPad (9th generation) - ₹2000.00
                      <br /> iPad mini - ₹2000.00
                    </p>
                    <p className='mt-2'>
                      <a className='text-blue-600 font-semibold' href="#">Shop iPad </a>
                      <Image width={150} height={25} alt='hdfc' className='mx-auto pt-4' src="/images/Waytobuy/hdfc.jpg" />
                    </p>
                  </div>
                </div>



              </div>
            </div>
            {/* third row */}
            <div className=' mt-8 md:mt-14'>
              <div className='flex justify-center flex-wrap flex-col md:flex-row w-full'>

                <div className='box-border m-0 p-0 min-w-0 w-full md:w-2/5'>
                  <div className='mx-auto w-3/5'>
                    <h3 className='text-2xl font-bold'>AirPod Offers</h3>
                    <p className='mt-2'>AirPods Pro - ₹1000.00

                    </p>
                    <p className='mt-2'>
                      <a className='text-blue-600 font-semibold' href="#">Shop AirPods </a>
                      <Image width={150} height={25} alt='hdfc' className='mx-auto pt-4' src="/images/Waytobuy/hdfc.jpg" />
                    </p>
                  </div>
                </div>

                <div className='box-border m-0 p-0 min-w-0 w-full md:w-2/5'>
                  <div className='mx-auto w-3/5'>
                    <h3 className='text-2xl font-bold'>AirPod Offers</h3>
                    <p className='mt-2'>AirPods Pro - ₹1000.00

                    </p>
                    <p className='mt-2'>
                      <a className='text-blue-600 font-semibold' href="#">Shop AirPods </a>
                      <Image width={150} height={25} alt='hdfc' className='mx-auto pt-4' src="/images/Waytobuy/hdfc.jpg" />
                    </p>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>




        <div>
          <div className="text-center mt-24 overflow-hidden">
            <div className='relative box-width mx-auto' >
              <div>
                <h3 className=" typography-headline text-5xl dd-compact-large-15 leading-tight font-semibold tracking-tighter font-sans">
                  Here’s how to estimate your monthly payments.
                </h3>
                <p className='typography-para mt-8 text-2xl dd-compact-large-15  font-normal tracking-normal font-sans'> Explore your online purchase options by selecting your account type and bank, then enter an estimated order total. Your total savings, including any special offers, will be calculated in checkout. You can only combine offers from the same bank, and all order items will be set to the same tenure.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <div className='py-20 text-center'>
            <h2 className=" typography-headline text-4xl mb-5 leading-7 font-semibold tracking-tight font-sans">
              Calculate your online monthly installment options.
            </h2>
            <div className='mb-8'>
              <ul className=' whitespace-nowrap'>
                <li className='inline-block relative mx-2'>
                  <button
                    className={` border border-black w-48 text-black pointer-events-auto rounded-full h-12 px-6 ${selectedButton === 0 ? 'bg-white text-black' : 'text-white bg-black'
                      }`}
                    onClick={() => handleButtonClick(0)}
                  >
                    <span>Credit Card EMI</span>
                  </button>
                </li>
                <li className='inline-block relative mx-2'>
                  <button
                    className={` border border-black w-48 text-black pointer-events-auto rounded-full h-12 px-6 ${selectedButton === 1 ? 'bg-white text-black' : 'text-white bg-black'
                      }`}
                    onClick={() => handleButtonClick(1)}
                  >
                    <span>Debit EMI</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className='py-4 lg:w-1/2 lg:mx-auto'>
                <div className='flex flex-wrap justify-center w-full'>
                  <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-2'>
                    <select className='w-full h-14 rounded-xl border border-black'>
                      <option value="American Express">American Express</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                      <option value="SBI Card">SBI Card</option>
                      <option value="RBL Card">RBL Bank</option>
                    </select>
                  </div>
                  <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-2'>
                    <input
                      className='w-full h-14 border border-black rounded-xl pl-4'
                      type="text"
                      name=""
                      id=""
                      placeholder='Enter Your Amount'
                      value={tempInputValue}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-2'>
                    <button
                      className='bg-blue-500 text-white border border-black rounded-xl w-full h-14 p-2'
                      onClick={handleCalculateClick}
                    >
                      Calculate
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <div className="min-h-300px relative text-left">
              <div className="static">


                <div className=" ">
                  <table className='w-full my-12 border-collapse border-spacing-0 table box-border '>
                    <thead>
                      <tr>
                        <th className='text-left lg:pl-96 sm:pl-16  w-1/2'>Terms</th>
                        <th className='text-right lg:pr-96 sm:pl-16  w-1/2'>Monthly Installments</th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr>
                        <td className=' text-left lg:pl-96 sm:pl-16 py-8 w-1/2'>
                          <div className="text-orange-600 pb-1 text-xm font-normal tracking-wide font-sans">No Cost EMI</div>
                          <div className="text-xl pb-1 font-semibold tracking-wide font-sans ">6 Installments</div>
                          <div className="text-black-400 pb-1 text-base  font-normal tracking-wide font-sans">{`${inputValue}`} total cost includes 15.99% pa</div>
                        </td>
                        <td className=' text-right lg:pr-96 sm:pl-16 py-8 w-1/2'>
                          <div className="text-black-400 pb-1 text-base  font-normal tracking-wide font-sans">{`${(inputValue / 6).toFixed(2)}/mo`}</div>
                          <div className="text-orange-600 pb-1 text-base  font-normal tracking-wide font-sans">Includes total savings of ₹229.00.</div>
                        </td>
                      </tr>

                      <tr>
                        <td className=' text-left lg:pl-96 sm:pl-16 py-8 w-1/2'>

                          <div className="text-xl pb-1 font-semibold tracking-wide font-sans ">12 Installments</div>
                          <div className="text-black-400 pb-1 text-base  font-normal tracking-wide font-sans">{`${inputValue}`} total cost includes 15.99% pa</div>
                        </td>
                        <td className=' text-right lg:pr-96 sm:pl-16 py-8 w-1/2'>
                          <div className="text-black-400 pb-1 text-base  font-normal tracking-wide font-sans">{`${(inputValue / 12).toFixed(2)}/mo`}</div>

                        </td>
                      </tr>
                      <tr>
                        <td className=' text-left lg:pl-96 sm:pl-16 py-8 w-1/2'>

                          <div className="text-xl pb-1 font-semibold tracking-wide font-sans ">18 Installments</div>
                          <div className="text-black-400 pb-1 text-base  font-normal tracking-wide font-sans">{`${inputValue}`} total cost includes 15.99% pa</div>
                        </td>
                        <td className=' text-right lg:pr-96 sm:pl-16 py-8 w-1/2'>
                          <div className="text-black-400 pb-1 text-base  font-normal tracking-wide font-sans">{`${(inputValue / 18).toFixed(2)}/mo`}</div>

                        </td>
                      </tr>


                    </tbody>
                  </table>

                </div>

              </div>
            </div>
          </div>
        </div>



        <div className="mt-20 mr-0 mb-40 ml-0">
          <div className="relative mx-auto" >
            <div className='text-center'>
              <p className="text-xl leading-[1.47059] font-normal tracking-tight font-sans">
                See <a className='text-blue-600' href="#">terms and conditions</a> for details.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className='text-center overflow-hidden bg-gray-100 relative'>
            {/* <Image width={2827} height={500} className='absolute z-1 top-0 left-0 w-full' alt="bgimage" src="/Waytobuys/bgimage.jpg" /> */}
            <div className="relative mx-auto lg:w-1/2 z-2">
              <div className='relative pt-25 pb-18'>
                <h3 className='text-lg font-bold pt-8'>Ayatrio Trade In</h3>
                <p className='typography-headline text-4xl font-semibold tracking-tight font-sans dd-compact-large-15'>
                  Save up to ₹62300.00 when you exchange your eligible smartphone.
                </p>
                <p className=' typography-para text-lg mt-4 mx-auto dd-compact-large-15'>Save on the new iPhone you want. Exchange your old smartphone to lower the price of your new iPhone — and your monthly instalments, both in-store and online.</p>
                <p className=' typography-para text-lg mt-4 mx-auto dd-compact-large-15'>And, get instant credit when you exchange an eligible Mac, iPad or Ayatrio Watch at the Ayatrio Store.</p>
                <p className='text-lg mt-1 mx-auto'><a className='text-blue-600' href="#">Learn more</a></p>
              </div>
            </div>
          </div>
        </div>


        <div>
          <div className='bg-gray-100 pt-20'>
            <div className='min-w-80 relative mx-auto'>
              <div className='text-center'>
                <h2 className='text-4xl lg:text-4xl sm:text-2xl leading-tight font-semibold font-sans mx-auto'>Ready. Set. Shop. </h2>
              </div>
              <div className='pt-20  mx-auto custom-max-width ' >
                <div className='flex flex-wrap flex-row w-full'>
                  <div className=" md:flex-basis-1/3 md:max-w-1/3 w-1/2 md:w-64 box-border m-0 p-0 min-w-0">
                    <div className='m-0 mx-2 my-2'>
                      <a className='box-border' href="#">
                        <div className="bg-white rounded-lg h-64  flex items-center justify-center">
                          <div className='flex flex-col items-center'>
                            <div className=''>
                              <Image src="/images/Waytobuy/macbook1.jpg" alt='mac' width={57} height={44} />
                            </div>
                            <div><span>Shop Mac</span></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className=" md:flex-basis-1/3 md:max-w-1/3 w-1/2 md:w-64 box-border m-0 p-0 min-w-0">
                    <div className='m-0 mx-2 my-2'>
                      <a className='box-border' href="#">
                        <div className="bg-white rounded-lg h-64  flex items-center justify-center">
                          <div className='flex flex-col items-center'>
                            <div className=''>
                              <Image src="/images/Waytobuy/macbook1.jpg" alt='mac' width={57} height={44} />
                            </div>
                            <div><span>Shop Mac</span></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className=" md:flex-basis-1/3 md:max-w-1/3 w-1/2 md:w-64 box-border m-0 p-0 min-w-0">
                    <div className='m-0 mx-2 my-2'>
                      <a className='box-border' href="#">
                        <div className="bg-white rounded-lg h-64  flex items-center justify-center">
                          <div className='flex flex-col items-center'>
                            <div className=''>
                              <Image src="/images/Waytobuy/macbook1.jpg" alt='mac' width={57} height={44} />
                            </div>
                            <div><span>Shop Mac</span></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className=" md:flex-basis-1/3 md:max-w-1/3 w-1/2 md:w-64 box-border m-0 p-0 min-w-0">
                    <div className='m-0 mx-2 my-2'>
                      <a className='box-border' href="#">
                        <div className="bg-white rounded-lg h-64  flex items-center justify-center">
                          <div className='flex flex-col items-center'>
                            <div className=''>
                              <Image src="/images/Waytobuy/macbook1.jpg" alt='mac' width={57} height={44} />
                            </div>
                            <div><span>Shop Mac</span></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className=" md:flex-basis-1/3 md:max-w-1/3 w-1/2 md:w-64 box-border m-0 p-0 min-w-0">
                    <div className='m-0 mx-2 my-2'>
                      <a className='box-border' href="#">
                        <div className="bg-white rounded-lg h-64  flex items-center justify-center">
                          <div className='flex flex-col items-center'>
                            <div className=''>
                              <Image src="/images/Waytobuy/macbook1.jpg" alt='mac' width={57} height={44} />
                            </div>
                            <div><span>Shop Mac</span></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className=" md:flex-basis-1/3 md:max-w-1/3 w-1/2 md:w-64 box-border m-0 p-0 min-w-0">
                    <div className='m-0 mx-2 my-2'>
                      <a className='box-border' href="#">
                        <div className="bg-white rounded-lg h-64  flex items-center justify-center">
                          <div className='flex flex-col items-center'>
                            <div className=''>
                              <Image src="/images/Waytobuy/macbook1.jpg" alt='mac' width={57} height={44} />
                            </div>
                            <div><span>Shop Mac</span></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center pb-12'>
          <div className='box-width'>
            <div className="flex flex-wrap  font-sans font-normal text-base font-weight-400 justify-center tracking-tighter leading-tight">
              <section className="lg:w-1/2 w-full flex justify-center">
                <div className='pt-14 relative font-sans text-center w-56 z-1'>
                  <Image src="/images/Waytobuy/macbook1.jpg" alt='mac' className='mx-auto' width={57} height={44} />
                  <h3 className='mt-4 font-sans font-semibold text-lg'>Get Help buying</h3>
                  <p className='mt-4 '>Have a question? Call a Specialist or chat online. Call 000800 040 1966.</p>
                  <span className='mt-4 text-blue-600'> <a href="#">Contact Us</a></span>
                </div>
              </section>
              <section className="lg:w-1/2 w-full flex justify-center">
                <div className='pt-14 relative font-sans text-center w-56 z-1'>
                  <Image src="/images/Waytobuy/macbook1.jpg" alt='mac' className='mx-auto' width={57} height={44} />
                  <h3 className='mt-4 font-sans font-semibold text-lg'>Get Help buying</h3>
                  <p className='mt-4'>Have a question? Call a Specialist or chat online. Call 000800 040 1966.</p>
                  <span className='mt-4 text-blue-600'> <a href="#">Contact Us</a></span>
                </div>
              </section>
            </div>
          </div>
        </div>

      </div>

    </>

  )
}

export default WaytoBuy