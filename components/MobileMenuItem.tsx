import React, { useState, useRef, useEffect } from 'react';
import { NavItem, NavSubItem, NavColumn } from '../types/navigation';
import { ChevronDown } from 'lucide-react';

interface MobileMenuItemProps {
  item: NavItem | NavSubItem;
  depth?: number;
  isLast?: boolean;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ 
  item, 
  depth = 0,
  isLast = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLUListElement>(null);
  
  // Check if item has sub-items (could be NavItem or NavSubItem)
  const hasSubItems = 'sub' in item && item.sub && item.sub.length > 0;
  
  // Calculate proper height for animations
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);
  
  // Function to handle click on menu item
  const handleClick = () => {
    if (hasSubItems) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`mb-1 ${depth > 0 ? 'mt-1' : ''}`}>
      <div 
        onClick={handleClick}
        className={`
          flex items-center justify-between w-full px-4 py-3 rounded-lg
          ${depth === 0 ? 'font-semibold text-slate-800 text-base' : 'font-medium text-slate-600 text-sm'}
          ${hasSubItems ? 'cursor-pointer' : ''}
          ${isOpen ? 'bg-blue-50 shadow-sm' : 'hover:bg-slate-50'}
          transition-all duration-200
        `}
      >
        <a 
          href={item.link} 
          className="flex-1 flex items-center"
          onClick={(e) => hasSubItems && e.preventDefault()}
        >
          {depth > 0 && (
            <div className="flex items-center" style={{ marginLeft: `${depth * 12}px` }}>
              <span 
                className={`inline-block mr-2 ${isOpen ? 'bg-blue-400' : 'bg-slate-300'} rounded-full`}
                style={{ width: '4px', height: '4px' }}
              />
            </div>
          )}
          <span className={`${isOpen ? 'text-blue-700' : ''} transition-colors duration-200`}>{item.name}</span>
          
          {'isMegaWithImage' in item && (
            <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Menu</span>
          )}
        </a>
        
        {hasSubItems && (
          <button
            onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
            className={`ml-2 p-1 rounded-full transition-all duration-300 
              ${isOpen ? 'rotate-180 bg-blue-100 text-blue-700' : 'text-slate-400 hover:bg-slate-100'}
            `}
            aria-expanded={isOpen}
          >
            <ChevronDown size={18} />
          </button>
        )}
      </div>
      
      {hasSubItems && (
        <div 
          ref={contentRef as React.RefObject<HTMLDivElement>}
          style={{ height: height !== undefined ? `${height}px` : undefined }}
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-100 bg-slate-50/50 rounded-lg mx-2 border-l-2 border-blue-100' : 'opacity-0'}
          `}
        >
          {/* For NavItem with columns */}
          {'isMegaWithImage' in item && item.sub?.map((column, columnIndex) => (
            <div key={column.name} className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {column.name}
              </div>
              <div className="space-y-1">
                {column.sub.map((subItem, subItemIndex) => (
                  <MobileMenuItem 
                    key={subItem.name}
                    item={subItem}
                    depth={depth + 1}
                    isLast={subItemIndex === column.sub.length - 1}
                  />
                ))}
              </div>
            </div>
          ))}
          
          {/* For NavSubItem with direct sub items */}
          {'sub' in item && !('isMegaWithImage' in item) && (
            <div className="py-1">
              {(item.sub as NavSubItem[]).map((subItem, subItemIndex) => (
                <MobileMenuItem 
                  key={subItem.name}
                  item={subItem}
                  depth={depth + 1}
                  isLast={subItemIndex === (item.sub as NavSubItem[]).length - 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileMenuItem;
