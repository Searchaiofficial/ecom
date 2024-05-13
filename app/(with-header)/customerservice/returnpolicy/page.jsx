"use client"
import QuestionAnswer from "@/components/FAQ/QuestionAnswer";
import { returnProcessSteps, returnPolicyDetails, returnPolicyFAQ, returnPolicySteps, initiateRefund } from "@/Model/ReturnPolicyData/returnPolicyData";
export default function Home() {
  return (
    <div>
          <div className="mt-20 sm:px-[50px] px-[20px] p-10 space-y-10">
       <div className="flex flex-col space-y-7 w-full">
          <div className="md:w-2/3">
            <h1 className="font-bold text-4xl">
              Return Policy - It’s ok to change your mind, we support you in
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
          
            <li>
               Return or Exchange within 60 Days from the date of the
              purchase
            </li>
            <li>
               AYATRIO Family members: Returns or Exchange within 90 Days
              from the date of purchase
            </li>
            <li>
               7 days returns or exchange (from the date of purchase) for
              purchases made from Circular Hub
            </li>
          

          <h4>
            The following articles are not eligible for returns or exchange
          </h4>
          
            <li>Cut Fabrics</li>
            <li>Food Articles</li>
            <li>Plants</li>
            <li>Custom made worktops</li>
          

          <h4>Love it or exchange it - policy for mattresses (Learn more)</h4>
          
            <li>
               It takes time for you and your new mattress to get used to
              each other. That's why we give you up to 30 days to be sure you're
              compatible. If the chemistry isn't right, simply come back and
              choose another mattress.
            </li>
            <li>
               We will exchange the mattress once during this 90-day
              period (from the date of purchase). Please ensure that the
              mattress you want to exchange is in clean, hygienic (not altered
              from its original form) and unstained condition.
            </li>
            <li>
               The mattress that you wish to exchange must be selected
              from our full price mattress range. If the new mattress is higher
              in price you will need to pay the difference, if the mattress you
              select is lower in price the difference will be refunded to you on
              an AYATRIO gift card.
            </li>
          
        </div>
        <div className="space-y-7 flex flex-col md:w-2/3">
          <h4 className="font-bold">
            Terms and Conditions for online purchase:
          </h4>
          {returnPolicySteps.map((curElement)=>{
            return (
              <li>{curElement.content}</li>
            )
          })}
        </div>
        <div className="space-y-7 flex flex-col md:w-2/3">
          <h4 className="font-bold">
            Terms and Conditions for in-store purchase:
          </h4>
            {returnProcessSteps.map((curElement)=>{
              return (
                <li>{curElement.content}</li>
              )
            })}
        </div>
        <div className="space-y-7 flex flex-col md:w-2/3">
          <h4 className="font-bold">
            AYATRIO India reserves the rights to reject/ refuse the returns and
            refunds in case:
          </h4>
            <li> Articles are not in their original packaging</li>
            <li>
               If the articles are not repackaged in the same packing
              material and the Flexi box as received
            </li>
            <li>
               If the articles/ products received are not in the same
              condition as shown in the pictures shared with the Customer
              Support Center at the time of raising the request for returns.
            </li>
          
        </div>
        <div className="space-y-7 flex flex-col md:w-2/3">
          <h4 className="font-bold">Have more questions about returns?</h4>
            <li> Write to us at customercare.india@AYATRIO.com</li>
            <li> Call us at 18004194532 (8 am - 10 pm)</li>
          
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
          {returnPolicyDetails.map((curElement)=>{
            return(
              <div>
            <h4 className="font-semibold">{curElement.title}</h4>
            <p>{curElement.content}</p>
          </div>
            )
          })}
        </div>
        </div>
    </div>
  )
}
