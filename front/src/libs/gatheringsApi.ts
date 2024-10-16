import axiosInstance from "@/libs/axiosInstance";
import {
  IGatherings,
  GatheringType,
  LocationType,
  SortByType,
  SortOrderType,
} from "@/types/gatherings";

interface GetGatheringListParams {
  pageParam: number; // offset
  type?: GatheringType | undefined;
  location?: LocationType | undefined;
  date?: Date | undefined;
  sortBy?: SortByType | undefined;
  sortOrder?: SortOrderType | undefined;
}

export const getGatheringList = async ({
  pageParam,
  type = undefined,
  location = undefined,
  date = undefined,
  sortBy = undefined,
  sortOrder = undefined,
}: GetGatheringListParams): Promise<IGatherings[]> => {
  const res = await axiosInstance.get(`/gatherings`, {
    params: {
      limit: 10,
      offset: pageParam,
      date,
      type,
      location,
      sortBy,
      sortOrder,
    },
  });

  // Adjust registrationEnd date
  const updatedData = res.data.map((gathering: IGatherings) => {
    const registrationEndDate = new Date(gathering.registrationEnd);
    const endDate = new Date(gathering.dateTime);

    registrationEndDate.setHours(registrationEndDate.getHours() + 9); // Add 9 hours
    endDate.setHours(endDate.getHours() + 9); // Add 9 hours

    return {
      ...gathering,
      registrationEnd: registrationEndDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  });

  console.log(updatedData);
  return updatedData;
};
