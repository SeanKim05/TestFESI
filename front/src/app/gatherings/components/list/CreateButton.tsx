import { useState } from "react";
import Button from "@/app/gatherings/components/Button";
import CreateGatheringModal from "@/app/gatherings/components/create/CreateGatheringModal";

function CreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {};

  return (
    <>
      <Button
        className="font-semibold px-[18px] md:px-[21px] py-[10px]"
        style="outlined"
        size="responsive"
        onClick={openModal}
      >
        모임 만들기
      </Button>
      {isOpen && (
        <CreateGatheringModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default CreateButton;
