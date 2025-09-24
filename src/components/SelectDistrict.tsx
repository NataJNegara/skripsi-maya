import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDistricts } from "@/db/data-service";
import { FormControl } from "./ui/form";

type district = {
  id: string;
  regency_id: string;
  name: string;
};

const SelectDistrict = async () => {
  const districts = await getDistricts();

  return (
    <Select>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Kecamatan" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Kecamatan</SelectLabel>
          {districts.map((item: district) => (
            <SelectItem value={item.id} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDistrict;
