import Image from "next/image";
import { Menu } from "@headlessui/react";
import Calendar from "@/app/components/Calendar";

interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedOption?: string;
  onOptionSelect: (option: DropdownOption) => void;
  showCalendar?: boolean;
  selectedDate?: Date;
  onSelectDate?: (date: Date | undefined) => void;
  onApply?: () => void;
  iconSrc?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconPosition?: "left" | "right";
}

export default function SortControls({
  options,
  selectedOption,
  onOptionSelect,
  showCalendar = false,
  selectedDate,
  onSelectDate = () => {},
  onApply = () => {},
  iconSrc = "/images/arrow-down.svg",
  iconWidth = 14,
  iconHeight = 8,
  iconPosition = "right",
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={`relative border-2 border-[#F3F4F6] text-[#1F2937] inline-flex items-center rounded-xl justify-between py-2 px-3 text-sm/6 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-[#111827] data-[open]:text-[#F9FAFB] data-[focus]:outline-1 data-[focus]:outline-white 
        ${iconPosition === "left" ? "min-w-[90px]" : "min-w-[110px]"}
      `}
      >
        {/* 아이콘: 왼쪽일 때 */}
        {iconPosition === "left" && (
          <span
            className="flex items-center justify-center"
            style={{ width: iconWidth, height: iconHeight }}
          >
            <Image
              src={iconSrc}
              alt="icon"
              width={iconWidth}
              height={iconHeight}
            />
          </span>
        )}
        {selectedOption || "날짜 선택"}

        {/* 아이콘: 오른쪽일 때 */}
        {iconPosition === "right" && (
          <span
            className="flex items-center justify-center"
            style={{ width: iconWidth, height: iconHeight }}
          >
            <Image
              src={iconSrc}
              alt="icon"
              width={iconWidth}
              height={iconHeight}
            />
          </span>
        )}
      </Menu.Button>

      <Menu.Items
        anchor={{
          to: "bottom start",
          gap: "8px",
        }}
        className="absolute p-1 rounded-2xl flex flex-col items-start justify-start bg-white border border-gray-4 shadow-custom z-50"
      >
        {options.map((option) => (
          <Menu.Item key={option.id}>
            {({ active }) => (
              <button
                onClick={() => onOptionSelect(option)}
                className={`${
                  active ? "bg-[#FFEDD5]" : ""
                } h-[38px] rounded-xl px-4 py-2 w-full text-start`}
              >
                {option.label}
              </button>
            )}
          </Menu.Item>
        ))}

        {showCalendar && (
          <div className="w-full px-[39px] py-5 flex flex-col gap-3">
            {onSelectDate && (
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
              />
            )}
            <div className="flex justify-center gap-3 h-10 text-sm font-semibold ">
              <button
                onClick={() => onSelectDate && onSelectDate(undefined)}
                className="w-[118px] rounded-xl border border-[#EA580C] text-[#EA580C]"
              >
                초기화
              </button>
              <Menu.Item>
                {({ close }) => (
                  <button
                    onClick={() => {
                      onApply();
                      close();
                    }}
                    className="w-[118px] rounded-xl bg-[#EA580C] text-white"
                  >
                    적용
                  </button>
                )}
              </Menu.Item>
            </div>
          </div>
        )}
      </Menu.Items>
    </Menu>
  );
}
