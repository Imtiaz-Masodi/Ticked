import { Icon } from "../../Icon";
import { Icons } from "../../Icon/IconMap";

type SwipeableBgContentProps = {
  text: string;
  icon: Icons;
  themeColorClasses: string;
};

export default function SwipeableBgContent({ text, icon, themeColorClasses }: SwipeableBgContentProps) {
  return (
    <div
      id="swipeable-item-bg-content"
      className={`h-full text-right flex justify-start items-center gap-2 px-4 text-white ${themeColorClasses}`}
    >
      <Icon name={icon} />
      <span className="text-sm leading-tight">{text}</span>
    </div>
  );
}
