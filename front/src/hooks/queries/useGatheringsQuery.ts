import { useInfiniteQuery } from "@tanstack/react-query";
import { getGatheringList } from "@/libs/gatheringsApi";
import {
  IGatherings,
  GatheringType,
  LocationType,
  SortByType,
  SortOrderType,
} from "@/types/gatherings";

export const useFetchGatherings = ({
  type,
  location,
  sortBy,
  date,
  sortOrder,
  pageSize = 10,
  isClient,
}: {
  type?: GatheringType;
  location?: LocationType;
  date?: Date;
  sortBy?: SortByType;
  sortOrder?: SortOrderType;
  pageSize?: number;
  isClient: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: ["gatherings", type, location, date, sortBy, sortOrder],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      getGatheringList({
        pageParam,
        type,
        location,
        date,
        sortBy,
        sortOrder,
        isClient,
      }),
    getNextPageParam: (lastPage: IGatherings[], allPages: IGatherings[][]) => {
      if (lastPage.length < pageSize) return null;
      const nextOffset = allPages.flat().length;
      return nextOffset;
    },
    select: (data) => data.pages.flat(),
    // refetchInterval: 3600000, // 1시간마다 refetch
    refetchOnWindowFocus: false,
    retry: 3,
    enabled: isClient,
  });
};
