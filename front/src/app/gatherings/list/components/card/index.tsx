import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IGatherings } from "@/types/gatherings";
import CardImage from "@/app/gatherings/list/components/card/CardImage";
import CardHeader from "@/app/gatherings/list/components/card/CardHeader";
import CardParticipants from "@/app/gatherings/list/components/card/CardParticipants";

interface CardProps {
  data: IGatherings;
}

function Card({ data }: CardProps) {
  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`/gatherings/${id}/detail`);
  };

  return (
    <motion.div
      key={data.id}
      className="h-[316px] md:h-[156px] grid grid-rows-[156px_1fr] rounded-3xl border border-gray-100 md:grid-cols-[280px_1fr] cursor-pointer"
      onClick={() => handleCardClick(data.id)}
      whileHover={{
        boxShadow: "0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <CardImage image={data.image} name={data.name} endTime={data.dateTime} />
      <div className="flex flex-col border-2 border-gray-100 py-4 px-4 md:pl-6 rounded-b-3xl md:rounded-b-none md:rounded-tr-3xl md:rounded-br-3xl">
        <CardHeader
          id={data.id}
          name={data.name}
          location={data.location}
          dateTime={data.dateTime}
        />
        <CardParticipants
          capacity={data.capacity}
          participantCount={data.participantCount}
        />
      </div>
    </motion.div>
  );
}

export default Card;
