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

  // Adjust registrationEnd and dateTime by adding 9 hours
  const updatedData = res.data.map((gathering: IGatherings) => {
    const registrationEndDate = new Date(gathering.registrationEnd);
    const dateTime = new Date(gathering.dateTime);

    registrationEndDate.setHours(registrationEndDate.getHours() + 9); // Add 9 hours to registrationEnd
    dateTime.setHours(dateTime.getHours() + 9); // Add 9 hours to dateTime

    return {
      ...gathering,
      registrationEnd: registrationEndDate.toISOString(),
      dateTime: dateTime.toISOString(), // Modify dateTime instead of using endDate
    };
  });

  console.log(updatedData);
  return updatedData;
};
