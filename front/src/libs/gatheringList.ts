// import api from "@/apis";

// export const getGatheringList = async () => {
//   const res = await api.get(`/gatherings`);

//   return res?.data;
// };

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatedData = res.data.map((gathering: any) => {
    const registrationEndDate = new Date(gathering.registrationEnd);
    registrationEndDate.setHours(registrationEndDate.getHours() + 9); // Add 9 hours
    return {
      ...gathering,
      registrationEnd: registrationEndDate.toISOString(), // Convert back to ISO string
    };
  });

  console.log(updatedData);
  return updatedData;
};
