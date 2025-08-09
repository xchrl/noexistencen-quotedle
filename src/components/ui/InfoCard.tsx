import Children from "@/types/Children";

function InfoCard({ children }: Children) {
  return (
    <div className="bg-background/80 border border-red-400 rounded-xl shadow-lg p-4 md:p-6 flex flex-col gap-2 md:gap-6">
      {children}
    </div>
  );
}

InfoCard.Heading = function Heading() {
  return <h2 className="text-xl font-bold text-center">Your statistics</h2>;
};

InfoCard.Content = function Content({ children }: Children) {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-4 text-lg text-center">
      {children}
    </div>
  );
};

InfoCard.ContentSection = function ContentSection({ children }: Children) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between last:col-span-2 gap-2">
      {children}
    </div>
  );
};

export default InfoCard;
