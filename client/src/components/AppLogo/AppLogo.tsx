type AppLogoProps = {
  className?: string;
  iconClasses?: string;
  labelClasses?: string;
  logoOnly?: boolean;
};

function AppLogo({
  className = "",
  iconClasses = "",
  labelClasses = "",
  logoOnly = false,
}: AppLogoProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <img src="/logo.png" alt="Ticked Logo" className={`h-9 ${iconClasses}`} />
      {!logoOnly && (
        <span
          className={`text-2xl font-medium sm:text-3xl text-stone-700 ${labelClasses}`}
        >
          Ticked
        </span>
      )}
    </div>
  );
}

export default AppLogo;
