"use client";

import React from "react";
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import ProgressBar from "@/app/gatherings/components/ProgressBar";
import DeadLineTag from "@/app/gatherings/components/DeadLineTag";
import GatheringInfo from "./GatheringInfo";
import GatheringSecSkeleton from "./GatheringSecSkeleton";
import { GatheringsParticipants, IGatherings } from "@/types/gatherings";
export default function GatehringSection({
  detailData,
  participantData,
  pageId,
  isGatherLoading,
}: {
  pageId: number;
  detailData: IGatherings;
  participantData: GatheringsParticipants[];
  isGatherLoading: boolean;
}) {
  if (isGatherLoading) {
    return <GatheringSecSkeleton />;
  }

  return (
    <section className="flex items-center justify-center md:flex-row flex-col gap-6">
      <div className="relative w-full md:w-1/2 h-[270px]">
        <Image
          className="relative rounded-3xl"
          src={detailData.image || "/images/default_gathering_image.png"}
          alt="Gather Detail Img"
          sizes="100%"
          fill
        />
        <DeadLineTag endTime={detailData?.registrationEnd} type="lg" />
      </div>

      <div className="w-full md:w-1/2 h-[270px] py-6 rounded-[24px] border-2 border-gray-200">
        <GatheringInfo
          dateInfo={detailData?.dateTime}
          titleInfo={detailData?.name}
          locationInfo={detailData?.location}
          pageId={pageId}
        />

        <hr className="border-dashed border-gray-400 mt-[23px]" />
        <div className="p-6">
          <UserAvatar
            participantData={participantData}
            gatherCapacity={detailData.capacity}
            participantCount={detailData.participantCount}
          />
          <ProgressBar
            percent={(detailData.participantCount / detailData?.capacity) * 100}
          />
          <div className="flex items-center justify-between text-[12px]">
            <div>최소인원 5명</div>
            <div>최대인원 {detailData?.capacity}명</div>
          </div>
        </div>
      </div>
    </section>
  );
}
