import Children from "@/types/Children";

function QuoteCard({ children }: Children) {
  return (
    <div className="bg-background/80 border border-red-400 rounded-xl shadow-lg p-4 md:p-6 w-full flex flex-col gap-4 md:gap-6">
      {children}
    </div>
  );
}

QuoteCard.Heading = function Heading({ children }: Children) {
  return <h2 className="text-xl font-bold text-center">{children}</h2>;
};

QuoteCard.QuoteArea = function QuoteArea({ children }: Children) {
  return (
    <div className="bg-secondary/90 rounded-lg p-6 md:text-xl text-center font-medium border shadow-sm">
      {children}
    </div>
  );
};

QuoteCard.Answers = function Answers({ children }: Children) {
  return <div className="grid grid-cols-1 gap-2 md:gap-4">{children}</div>;
};

export { QuoteCard };
