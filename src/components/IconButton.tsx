import { HomeIcon } from "@heroicons/react/16/solid";
import { SVGProps } from "react";

interface Props {
  icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
}
function IconButton({ icon: Icon, title }: Props) {
  return (
    <button className="flex items-center space-x-2 h-10 py-1 px-3 w-full text-white hover:text-primary">
      <Icon className="w-6 h-6" />
      <span className="text-lg font-bold">{title}</span>
    </button>
  );
}

export default IconButton;
