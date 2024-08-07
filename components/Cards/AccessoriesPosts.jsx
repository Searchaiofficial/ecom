import AccessoriesSlider from "./AccessoriesSlider";

const AccessoriesPosts = ({ accessories }) => {
  return (
    <div>
      {accessories && accessories.length > 0 && (
        <div>
          <h2 className="font-semibold text-2xl pb-[8px] ">
            {accessories[0].subcategory}
          </h2>
        </div>
      )}
      <AccessoriesSlider accessories={accessories} />
    </div>
  );
};

export default AccessoriesPosts;
