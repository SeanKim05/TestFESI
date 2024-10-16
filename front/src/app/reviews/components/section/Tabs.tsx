"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "../content/Card";
import { useReviews } from "@/hooks/queries/useReviews";

const tabs = [
  {
    id: "DALLAEMFIT",
    label: "달램핏",
    hasSubTabs: true,
    imageSrc: "/images/dalaemfit.svg",
    alt: "dalaemfit",
    subTabs: [
      { id: "ALL", label: "전체" },
      { id: "OFFICE_STRETCHING", label: "오피스 스트레칭" },
      { id: "MINDFULNESS", label: "마인드풀니스" },
    ],
  },
  {
    id: "WORKATION",
    label: "워케이션",
    imageSrc: "/images/workation.svg",
    alt: "workation",
    hasSubTabs: true,
    subTabs: [{ id: "ALL", label: "전체" }],
  },
];

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [selectedSubTab, setSelectedSubTab] = useState(
    tabs[0].subTabs ? tabs[0].subTabs[0].id : "",
  );

  console.log("selectedTab", selectedTab);

  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(
    "지역 선택",
  );

  const [selectedSort, setSelectedSort] = useState("createdAt");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const { reviews, reviewScores, isError } = useReviews({
    type:
      selectedTab === "WORKATION"
        ? selectedTab
        : selectedSubTab === "ALL"
          ? ["OFFICE_STRETCHING", "MINDFULNESS"]
          : selectedSubTab,
    location: selectedRegion === "지역 선택" ? undefined : selectedRegion,
    sortBy: selectedSort,
  });

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.id === selectedTab);
    if (currentTab?.hasSubTabs) {
      setSelectedSubTab(currentTab?.subTabs ? currentTab.subTabs[0].id : "");
    } else {
      setSelectedSubTab("");
    }
  }, [selectedTab]);

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    console.log("!!!!!!!!!!", tabId);
  };
  const handleSubTabClick = (subTabId: string) => {
    setSelectedSubTab(subTabId);
    console.log("!!!!!!!!!!", subTabId);
  };

  // if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div>
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-1 pb-1 text-lg font-semibold ${
              selectedTab === tab.id
                ? "border-[#111827] selected-tab"
                : "text-gray-400 border-transparent"
            } relative`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
            <span>
              <Image
                src={tab.imageSrc}
                alt={tab.alt}
                width={32}
                height={32}
                className={`${selectedTab === tab.id ? "fill-current text-red-400" : "fill-current text-gray-400"}`}
              />
            </span>
            {selectedTab === tab.id && (
              <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-gray-900 rounded-[1px]"></span>
            )}
          </button>
        ))}
      </div>

      <div className="">
        {tabs.find((tab) => tab.id === selectedTab)?.hasSubTabs && (
          <div className="space-x-2 border-b-2 border-[#E5E7EB]">
            {tabs
              .find((tab) => tab.id === selectedTab)
              ?.subTabs?.map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => handleSubTabClick(subTab.id)}
                  className={`${selectedSubTab === subTab.id ? "selected-subtab bg-black text-white" : "bg-[#E5E7EB]"} h-10 appearance-none px-4 rounded-xl my-4 text-center text-sm font-medium`}
                >
                  {subTab.label}
                </button>
              ))}
          </div>
        )}
      </div>

      <div>
        <Card
          reviews={reviews || []}
          reviewScores={reviewScores || []}
          tabs={tabs}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
