"use client";

import InfiniteScroll from "@/app/gatherings/components/list/InfiniteScroll";
import Header from "@/app/components/Header";
import Tabs from "@/app/gatherings/components/list/Tabs";
import Filters from "@/app/gatherings/components/filter";
import Card from "@/app/gatherings/components/card";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useFetchGatherings } from "@/hooks/queries/useGatheringsQuery";
import { useGatheringsStore } from "@/stores/useGatheringsStore";
import { IGatherings } from "@/types/gatherings";

function Gatherings() {
  const { tab: type, location, date, sortBy, sortOrder } = useGatheringsStore();
  const isClient = typeof window !== "undefined";

  const {
    data: gatherings = [],
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useFetchGatherings({
    type,
    location,
    date,
    sortBy,
    sortOrder,
    isClient,
  });

  return (
    <div className="min-w-[375px] max-w-[375px] px-4 md:max-w-[744px] md:px-[24.5px] lg:max-w-[996px] lg:min-w-[1200px] lg:px-[102px] min-h-screen mx-auto flex flex-col bg-gray-50">
      <Header type="class" />
      <Tabs />
      <Filters />
      <InfiniteScroll
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : gatherings.length === 0 ? (
          <div className="text-sm text-gray-500 pt-[224px] md:pt-[355px] lg:pt-[335px] w-full text-center">
            <p>아직 모임이 없어요.</p>
            <p>지금 바로 모임을 만들어보세요.</p>
          </div>
        ) : (
          gatherings.map((item: IGatherings) => (
            <Card key={item.id} data={item} />
          ))
        )}
      </InfiniteScroll>
    </div>
  );
}

export default Gatherings;
