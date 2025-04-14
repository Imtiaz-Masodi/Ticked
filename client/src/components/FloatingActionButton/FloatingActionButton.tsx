import { Size } from "../../utils/enums";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

type FloatingActionButtonProps = {
  icon: Icons;
  onClick: () => void;
};

function FloatingActionButton({ icon, onClick }: FloatingActionButtonProps) {
  return (
    <div className="shadow-md fixed bottom-4 right-4 rounded-full overflow-hidden">
      <Button className="ps-3 pe-3 pt-3 pb-3 bg-secondary" size={Size.lg} onClick={onClick} iconOnly>
        <Icon name={icon} />
      </Button>
    </div>
  );
}

export default FloatingActionButton;
