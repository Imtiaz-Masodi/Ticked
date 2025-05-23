import { Size } from "../../utils/enums";

type AppLogoProps = {
  size?: Size;
  logoOnly?: boolean;
  className?: string;
  darkMode?: boolean;
};

const logoVariantsIconStyle = Object.freeze({
  [Size.sm]: "h-6",
  [Size.md]: "h-9",
  [Size.lg]: "h-11",
});

const logoVariantsLabelStyle = Object.freeze({
  [Size.sm]: "text-xl",
  [Size.md]: "text-2xl",
  [Size.lg]: "text-4xl",
});

function AppLogo({ size = Size.md, logoOnly = false, darkMode = false, className = "" }: AppLogoProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <img src="/logo.png" alt="Ticked Logo" className={`${logoVariantsIconStyle[size]}`} />
      {!logoOnly && (
        <span className={`font-medium ${darkMode ? "text-zinc-100" : "text-zinc-700"} ${logoVariantsLabelStyle[size]}`}>
          Ticked
        </span>
      )}
    </div>
  );
}

export default AppLogo;
