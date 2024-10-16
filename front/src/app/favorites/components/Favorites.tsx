"use client";

import { useEffect } from "react";
import useFavoritesStore from "@/stores/useFavoritesStore";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Card from "@/app/gatherings/components/card";
import { useFetchGatherings } from "@/hooks/queries/useGatheringsQuery";
import { IGatherings } from "@/types/gatherings";
import Tabs from "@/app/gatherings/components/list/Tabs";
import { useGatheringsStore } from "@/stores/useGatheringsStore";
import InfiniteScroll from "@/app/gatherings/components/list/InfiniteScroll";
import Filters from "@/app/gatherings/components/filter";

const Favorites = () => {
  const { favorites, setFavoritesFromStorage } = useFavoritesStore();
  const { tab: type, location, date, sortBy, sortOrder } = useGatheringsStore();
  const isClient = typeof window !== "undefined";

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useFetchGatherings({
      type,
      location,
      date,
      sortBy,
      sortOrder,
      isClient,
    });

  useEffect(() => {
    setFavoritesFromStorage();
  }, [setFavoritesFromStorage]);

  const favoriteGatherings = data?.filter((gathering: IGatherings) =>
    favorites.has(gathering.id),
  );

  return (
    <>
      <Tabs />
      <Filters />
      <InfiniteScroll
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : favoriteGatherings?.length === 0 && !hasNextPage ? (
          <div className="text-sm text-gray-500 pt-[224px] md:pt-[355px] lg:pt-[335px] w-full text-center">
            <p>아직 찜한 모임이 없어요.</p>
          </div>
        ) : (
          favoriteGatherings?.map((item: IGatherings) => {
            return <Card key={item.id} data={item} showExpiration={true} />;
          })
        )}
      </InfiniteScroll>
    </>
  );
};

export default Favorites;
