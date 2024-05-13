"use client"
import QuestionAnswer from "@/components/FAQ/QuestionAnswer";
export default function Home() {
  const returnPolicyFAQ = [
    {
      id: 1,
      question: "What do we mean when we say change of mind?",
      answer:
        "You can purchase products from us in store or online and we will accept them back for a full refund in the original method of payment up to 60 days after the purchase, 90 days if you are a AYATRIO Family or Business member.",
    },
    {
      id: 2,
      question: "What do we expect from you?",
      answer:
        "For us to give you a full refund we expect that the products are in the original unopened packaging, if the product does not come with packaging then all labels must still be intact. If the packaging has been removed from the products, then we will not issue a refund. For example, our home furnishing accessories don’t always have their own packaging, like cushions or kitchen utensils",
    },
    {
      id: 3,
      question: "What you should expect from us?",
      answer:
        "A friendly and helpful co-worker to support you with the refund, whether you speak to one of our team at the customer support center or in-store. We may refuse the return, exchange or offer a Refund card if the returns criteria are not fully met. If proof of purchase is unavailable, we will refund the lowest selling price within the 6 months for that product.",
    },
  ];

  const initiateRefund = [
    {
      id: 1,
      question: "Purchase from store?",
      answer:
        "Our customers living in Hyderabad, Bengaluru, and Mumbai, we welcome you to our returns department where you can return your products.We are happy to arrange a pickup of your products, please contact via CHAT or call customer support center on 1800 419 4532 and have your invoice available. For this service there are charges applicable, see our delivery prices for information or ask one of our team in our customer support center.",
    },
    {
      id: 2,
      question: "Purchase from online?",
      answer:
        "Please contact our customer support center on 1800 419 4532 and have your invoice available. For this service there are charges applicable, see our delivery prices for information or ask one of our team in our customer support center.",
    },
  ];

  return (
    <div>
      <div className="mt-20 sm:ml-[50px] ml-[20px] sm:mr-[50px] mr-[20px] p-10 space-y-10">
        <div className="flex flex-col space-y-7 w-full">
          <div className="md:w-2/3">
            <h1 className="font-bold text-4xl">
              Returns Policy - It’s ok to change your mind, we support you in
              the safest way!
            </h1>
          </div>
          <h2 className="font-semibold text-lg">
            Need to return your order? No worries! Fill the form -
          </h2>
          <p className="underline">Online order</p>
          <p className="underline">In-store order</p>
        </div>
        <p className="md:w-2/3">
          With our return policy, we have ensured that our customers have a safe
          shopping experience with AYATRIO. Our mission is to enhance the
          customer experience and to enable our customers in making informed
          decisions.
        </p>
        <h2 className="font-bold text-xl">AYATRIO India:</h2>
        <div className="space-y-5 flex flex-col md:w-2/3">
          <h4 className="font-bold">Returns Policy - Effective Nov, 2022</h4>
          <ul>
            <li>
              &#8226; Return or Exchange within 60 Days from the date of the
              purchase
            </li>
            <li>
              &#8226; AYATRIO Family members: Returns or Exchange within 90 Days
              from the date of purchase
            </li>
            <li>
              &#8226; 7 days returns or exchange (from the date of purchase) for
              purchases made from Circular Hub
            </li>
          </ul>

          <h4>
            The following articles are not eligible for returns or exchange
          </h4>
          <ul>
            <li>&#8226;Cut Fabrics</li>
            <li>&#8226;Food Articles</li>
            <li>&#8226;Plants</li>
            <li>&#8226;Custom made worktops</li>
          </ul>

          <h4>Love it or exchange it - policy for mattresses (Learn more)</h4>
          <ul>
            <li>
              &#8226; It takes time for you and your new mattress to get used to
              each other. That's why we give you up to 30 days to be sure you're
              compatible. If the chemistry isn't right, simply come back and
              choose another mattress.
            </li>
            <li>
              &#8226; We will exchange the mattress once during this 90-day
              period (from the date of purchase). Please ensure that the
              mattress you want to exchange is in clean, hygienic (not altered
              from its original form) and unstained condition.
            </li>
            <li>
              &#8226; The mattress that you wish to exchange must be selected
              from our full price mattress range. If the new mattress is higher
              in price you will need to pay the difference, if the mattress you
              select is lower in price the difference will be refunded to you on
              an AYATRIO gift card.
            </li>
          </ul>
        </div>
        <div className="space-y-7 flex flex-col md:w-2/3">
          <h4 className="font-bold">
            Terms and Conditions for online purchase:
          </h4>
          <ul className="space-y-5">
            <li>
              &#8226; For returns or exchange of online orders customer can
              either contact Customer Support Center (Timing: 8 am - 10 pm) or
              head to your local AYATRIO store.
            </li>
            <li>
              &#8226; Customer needs to contact Customer Support Center through
              chat or call.
            </li>
            <li>
              &#8226; We will need customers to share the pictures of the
              articles for us to initiate exchange or refund and the proof of
              purchase (invoice).
            </li>
            <li>
              &#8226; Customer can also connect to Customer Support Center
              through filling up this returns form.
            </li>
            <li>
              &#8226; Once the form is received, we will contact you within 24
              hrs. before the articles are accepted for returns or exchange.
            </li>
            <li>
              &#8226; Post which article would be accordingly picked up from the
              customer’s doorstep.
            </li>
            <li>
              &#8226; If the article is eligible to be returned, we suggest you
              pack the articles exactly in the same condition as you received
              it.
            </li>
            <li>
              &#8226; For returns or exchange of online orders, we insist
              customers share the pictures of the articles and the proof of
              purchase (invoice) with our Customer Support Center by filling
              this returns form before the articles are accepted for returns or
              exchange by our CSC Co-workers and accordingly picked up from the
              customer’s doorstep.
            </li>
            <li>
              &#8226; If the article is eligible to be returned, we suggest you
              pack the articles exactly in the same condition as you received
              it.
            </li>
          </ul>
        </div>
        <div className="space-y-7 flex flex-col md:w-2/3">
          <h4 className="font-bold">
            Terms and Conditions for in-store purchase:
          </h4>
          <ul className="space-y-5">
            <li>
              &#8226; Customer can either head to your local AYATRIO store and
              enter through the Exchanges & returns entrance.
            </li>
            <li>
              &#8226; Follow signage to the Exchanges & returns desk. Once you
              arrive, sign up to join the line. Or call customer support center
              for further support.
            </li>
            <li>
              &#8226; If your items were delivered from the store and you need
              to schedule a pickup, please contact the Customer Support Center.
            </li>
            <li>
              &#8226; Retain the original packaging of the articles opened as
              the returns or exchange will be accepted only once the articles
              are packed in their original packaging as per the instructions
              provided. Know more.
            </li>
            <li>
              &#8226; Returns or Exchange will be processed on presenting the
              original invoice onlyAll refunds will be processed in the original
              mode of payment. We request customer to carry All refunds will be
              processed within 21 days from the date of returns accepted by
              AYATRIO
            </li>
          </ul>
        </div>
        <div className="space-y-7 flex flex-col md:w-2/3">
          <h4 className="font-bold">
            AYATRIO India reserves the rights to reject/ refuse the returns and
            refunds in case:
          </h4>
          <ul className="space-y-5">
            <li>&#8226; Articles are not in their original packaging</li>
            <li>
              &#8226; If the articles are not repackaged in the same packing
              material and the Flexi box as received
            </li>
            <li>
              &#8226; If the articles/ products received are not in the same
              condition as shown in the pictures shared with the Customer
              Support Center at the time of raising the request for returns.
            </li>
          </ul>
        </div>
        <div className="space-y-7 flex flex-col md:w-2/3">
          <h4 className="font-bold">Have more questions about returns?</h4>
          <ul className="space-y-5">
            <li>&#8226; Write to us at customercare.india@AYATRIO.com</li>
            <li>&#8226; Call us at 18004194532 (8 am - 10 pm)</li>
          </ul>
        </div>
        <p className="flex flex-col md:w-2/3">
          The terms and conditions set out in this return policy apply to all
          goods purchased from AYATRIO India. This return policy is in addition
          to the customer's statutory rights.
        </p>
        <div className="flex flex-col">
          {returnPolicyFAQ.map((curElement) => {
            return <QuestionAnswer key={curElement.id} {...curElement} />;
          })}
        </div>
        <div>
          <h2 className="font-bold text-xl">How do I initiate a refund?</h2>
          <div className="flex flex-col">
            {initiateRefund.map((curElement) => {
              return <QuestionAnswer key={curElement.id} {...curElement} />;
            })}
          </div>
        </div>
        <div className="space-y-7 flex flex-col md:w-2/3">
          <div>
            <h4 className="font-semibold">Delivery packaging:</h4>
            <p>
              Please note that if you opt for a pickup for your refund we
              require you to keep the box and any packing material that came
              with the parcel, in a condition that allows us to transport the
              products safely. We see the delivery and returning of goods as a
              joint responsibility if the products are damaged due to absence or
              condition of packaging this can affect the amount we refund you.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Change of products:</h4>
            <p>
              Once your online order is processed we pick and hand over your
              items immediately to our delivery provider. This means we are not
              able to alter the order once payment has been processed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Order cancellation:</h4>
            <p>
              If you cancel your order before the goods are dispatched from our
              central warehouse you will be entitled to a full refund of product
              and services. Once the products have left the central warehouse we
              will process a refund for product, however, the delivery charge
              will not be refunded.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">
              Cancellation is not possible within 24 hours of the start of the
              delivery time window.
            </h4>
            <p>
              e.g. If your delivery window is 10am-2pm, you must cancel by
              9.59am latest on the previous day.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
