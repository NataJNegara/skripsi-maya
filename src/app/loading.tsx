import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoaderCircle className="w-18 h-18 animate-spin" />
    </div>
  );
};

export default Loading;
