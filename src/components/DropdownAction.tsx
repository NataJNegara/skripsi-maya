import { EllipsisVertical } from "lucide-react";
import DeleteDialog from "./shared/DeleteDialog";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type DropdownActionType = {
  deleteId?: string;
  onDelete?: (params: string) => Promise<{ success: boolean; message: string }>;
  onActionSuccess?: () => void;
};

const DropdownAction = ({
  deleteId,
  onDelete,
  onActionSuccess,
}: DropdownActionType) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className=" cursor-pointer">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {deleteId && onDelete && (
            <DropdownMenuItem asChild>
              <DeleteDialog
                id={deleteId}
                action={onDelete}
                onActionSuccess={onActionSuccess}
              />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAction;
