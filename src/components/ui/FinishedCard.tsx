import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import Children from "@/types/Children";

function FinishedCard({ children }: Children) {
  return (
    <div className="bg-background/80 border border-red-400 rounded-xl shadow-lg p-4 md:p-6 flex flex-col gap-4 md:gap-6 pb-8">
      {children}
    </div>
  );
}

FinishedCard.Heading = function Heading() {
  return <h2 className="text-xl font-bold text-center">Finished!</h2>;
};

FinishedCard.Carousel = function FinishedCardCarousel({ children }: Children) {
  return (
    <Carousel
      orientation="vertical"
      className="mt-10 mb-8 md:mb-10"
      opts={{ dragFree: true }}
      style={{ userSelect: "none" }}
    >
      <CarouselPrevious />
      <CarouselContent className="h-[400px]">{children}</CarouselContent>
      <CarouselNext />
    </Carousel>
  );
};

export default FinishedCard;
