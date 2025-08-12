import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <div className="w-full md:w-1/4 flex gap-2">
      <Input type="text" name="post" placeholder="pencarian..." />
      <Button className="cursor-pointer bg-brand hover:bg-brand-secondary">
        <Search />
      </Button>
    </div>
  );
};

export default SearchBar;
