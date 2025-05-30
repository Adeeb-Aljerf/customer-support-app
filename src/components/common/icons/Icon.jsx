import { ICONS, ICONS_SOLID } from './index.js';
import IconWrapper from '../IconWrapper.jsx';

/**
 * Icon Component
 * Easy-to-use icon component that accepts icon names as strings
 * Applies Figma design specifications automatically
 */
const Icon = ({ 
  name, 
  variant = 'outline', 
  size = 24,
  className = '',
  color = 'currentColor',
  ...props 
}) => {
  const iconMap = variant === 'solid' ? ICONS_SOLID : ICONS;
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found. Available icons:`, Object.keys(iconMap));
    return null;
  }

  return (
    <IconWrapper
      icon={IconComponent}
      size={size}
      variant={variant}
      className={className}
      color={color}
      {...props}
    />
  );
};

export default Icon;