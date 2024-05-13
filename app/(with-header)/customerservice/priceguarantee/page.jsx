import Image from "next/image"
export default function PriceGuarantee() {
  return (
    <div className="ml-20 mr-20">
     <section className="mt-20 mb-6">
          <div className="flex flex-col space-y-5 w-full">
            <h4 className="md:w-2/3 font-bold text-4xl">Prices and price tags</h4>
            <p className="md:w-2/3">
              At AYATRIO you get low prices every day! Find all you need to know
              about a product on the price tag in store or on the product pages
              of this website. Whether it's what a product is made from, its
              size assembled or packaged, the how-to-care instructions, or of
              course the price.
            </p>
            <p className="md:w-2/3">
              "To design a desk which costs $1,000 is easy for a furniture
              designer, but to design a functional and good desk which costs $50
              can only be done by the very best." - Ingvar Kamprad, founder of
              AYATRIO
            </p>
          </div>
        </section>
        <hr />

        <section className="pt-8 pb-10">
          <div className="flex flex-col space-y-5 w-full">
            <div className="md:w-2/3">
              <h3 className="font-bold text-lg">
                Our prices are the same in store or online
              </h3>
            </div>
            <div className="flex flex-col md:flex-row w-full justify-between space-y-3">
              <div className="md:w-1/2 space-y-4">
                <p>
                  When you check-out you will see the delivery costs and have
                  the option to add assembly. (Remember, AYATRIO products are
                  designed to be easy to assemble, so if you don't want to pay
                  why not give it a try?)
                </p>
                <p>
                  And if you are an AYATRIO Family member, you can buy some
                  products at a special price.
                </p>
                <p>
                  We reserve the right to adjust our prices according to any
                  alteration of GST or any other changes beyond our reasonable
                  control, e.g. major currency fluctuations.
                </p>
                <p>
                  We try our best to ensure that the information on this website
                  is correct at all times. Please also note that some articles
                  may vary slightly in size and colour.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image src="/mug.avif" alt="mug" width={500} height={500}
                />
              </div>
            </div>
          </div>
        </section>
        <hr/>
        <section className="pt-8 mb-28">
          <div className="flex flex-col space-y-5 w-full">
            <div>
              <h4 className="font-bold text-xl">In store price tags </h4>
            </div>
            <div className="flex flex-col md:flex-row space-x-2">
              <div>
                <Image width={400} height={800}  src="/front.webp" alt=""/>
              </div>
              <div>
                <Image  width={400} height={800} src="/rev.avif" alt=""/>
              </div>
              <div>
                <Image  width={400} height={800} src="/bottom.avif" alt=""/>
              </div>
            </div>
          </div>
        </section>
  </div>
  )
}