// React import not needed for JSX in modern React

/**
 * IconWrapper Component
 * A reusable wrapper for Hero Icons with consistent styling
 * Based on Figma design specifications
 */
const IconWrapper = ({
  icon: Icon,
  size = 24,
  className = "",
  color = "currentColor",
  variant = "outline", // 'outline' or 'solid'
  ...props
}) => {
  if (!Icon) {
    console.warn("IconWrapper: No icon provided");
    return null;
  }

  const baseClasses = `
    inline-block
    ${className}
  `.trim();

  return (
    <Icon
      className={baseClasses}
      width={size}
      height={size}
      style={{ color }}
      strokeWidth={variant === "outline" ? 1.5 : undefined}
      {...props}
    />
  );
};

export default IconWrapper;
