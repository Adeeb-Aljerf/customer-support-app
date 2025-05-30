/**
 * Main Icons Export
 * Central export point for all icon-related components and utilities
 */

// Export the main Icon component
export { default as Icon } from './Icon.jsx';

// Export IconWrapper for advanced usage
export { default as IconWrapper } from '../IconWrapper.jsx';

// Export IconShowcase for development/demo purposes
export { default as IconShowcase } from './IconShowcase.jsx';

// Export all individual icons and mappings
export * from './index.js';

// Export commonly used icon sets for convenience
export {
  ICONS,
  ICONS_SOLID,
  // Individual icons for direct import
  DocumentChartBarIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  BellIcon,
  ArrowRightStartOnRectangleIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserGroupIcon,
  UserIcon,
  UserCircleIcon,
  PencilSquareIcon,
  PaperClipIcon,
  Squares2X2Icon,
  TicketIcon,
  IdentificationIcon,
  XCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
  FunnelIcon,
  FaceSmileIcon,
  MapPinIcon,
  ArrowsUpDownIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from './index.js';
