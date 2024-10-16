import { QueryClient } from "@tanstack/react-query";
import { getGatheringList } from "@/libs/gatheringsApi";
import {
  IGatherings,
  GatheringType,
  LocationType,
  SortByType,
  SortOrderType,
} from "@/types/gatherings";

export async function prefetchGatherings({
  queryClient,
  type,
  location,
  date,
  sortBy,
  sortOrder,
}: {
  queryClient: QueryClient;
  type?: GatheringType;
  location?: LocationType;
  date?: Date;
  sortBy?: SortByType;
  sortOrder?: SortOrderType;
}) {
  await queryClient.prefetchInfiniteQuery<IGatherings[]>({
    initialPageParam: 0,
    queryKey: ["gatherings", type, location, date, sortBy, sortOrder],
    queryFn: ({ pageParam = 0 }) =>
      getGatheringList({
        pageParam: pageParam as number,
        type,
        location,
        date,
        sortBy,
        sortOrder,
      }),
    getNextPageParam: (lastPage: IGatherings[], allPages: IGatherings[][]) => {
      if (lastPage.length < 10) return null;
      const nextOffset = allPages.flat().length;
      return nextOffset;
    },
  });
}
