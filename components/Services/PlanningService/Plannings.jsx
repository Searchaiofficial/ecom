import PlanningCard from "./PlanningCard";

export default function Plannings({ content }) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 block">
                {content.map((plan) => (<PlanningCard content={plan} />))}
            </div>
            <hr className="mt-16" />
        </>
    )
}