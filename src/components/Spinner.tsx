import { LoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="w-full flex items-center justify-center py-32">
      <LoaderCircle className="w-8 h-8 md:w-16 md:h-16 animate-spin" />
    </div>
  );
};

export default Spinner;
