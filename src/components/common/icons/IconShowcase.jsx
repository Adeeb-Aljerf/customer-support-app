import Icon from './Icon.jsx';

/**
 * IconShowcase Component
 * Demonstrates all available icons with Figma layout specifications
 * Layout: width: 204px, height: 196px, gap: 12px
 */
const IconShowcase = () => {
  const iconNames = [
    'document-chart-bar',
    'magnifying-glass',
    'cog-6-tooth',
    'bell',
    'arrow-right-start-on-rectangle',
    'phone',
    'envelope',
    'user-group',
    'user',
    'user-circle',
    'pencil-square',
    'paper-clip',
    'squares-2x2',
    'ticket',
    'identification',
    'x-circle',
    'check-circle',
    'information-circle',
    'arrow-left',
    'ellipsis-horizontal',
    'x-mark',
    'funnel',
    'face-smile',
    'map-pin',
    'arrows-up-down',
    'chevron-double-right',
    'chevron-left',
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Icon Showcase</h2>
      
      {/* Figma Layout Container */}
      <div 
        className="grid grid-cols-6 gap-3 p-6 border rounded-lg bg-gray-50"
        style={{
          width: '204px',
          height: '196px',
          gap: '12px'
        }}
      >
        {iconNames.slice(0, 12).map((iconName) => (
          <div 
            key={iconName}
            className="flex flex-col items-center justify-center p-2 bg-white rounded border hover:shadow-md transition-shadow"
          >
            <Icon 
              name={iconName} 
              size={24} 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            />
            <span className="text-xs mt-1 text-center text-gray-500 truncate w-full">
              {iconName.split('-').slice(0, 2).join('-')}
            </span>
          </div>
        ))}
      </div>

      {/* All Icons Grid */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">All Available Icons</h3>
        <div className="grid grid-cols-8 gap-4">
          {iconNames.map((iconName) => (
            <div 
              key={iconName}
              className="flex flex-col items-center p-3 border rounded hover:shadow-md transition-shadow"
            >
              <Icon 
                name={iconName} 
                size={32} 
                className="text-gray-700 hover:text-blue-600 transition-colors mb-2"
              />
              <span className="text-xs text-center text-gray-600">
                {iconName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Usage Examples</h3>
        <div className="space-y-4 bg-gray-100 p-4 rounded">
          <div className="flex items-center gap-2">
            <Icon name="user" size={20} />
            <span>Default outline icon</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon name="user" variant="solid" size={20} className="text-blue-600" />
            <span>Solid variant with custom color</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon name="bell" size={16} className="text-red-500" />
            <span>Small notification icon</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon name="check-circle" size={24} className="text-green-600" />
            <span>Success state</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconShowcase;
