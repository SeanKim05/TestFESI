import LocationFilter from "@/app/gatherings/list/components/filter/LocationFilter";
import DateFilter from "@/app/gatherings/list/components/filter/DateFilter";
import SortFilter from "@/app/gatherings/list/components/filter/SortFilter";

function GatheringsFilter() {
  return (
    <div className="flex justify-between pt-[12px] md:pt-4  text-sm">
      <div className="flex flex-row gap-2">
        <LocationFilter />
        <DateFilter />
      </div>
      <SortFilter />
    </div>
  );
}

export default GatheringsFilter;
