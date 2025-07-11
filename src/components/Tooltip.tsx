import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface TooltipProps {
   children: ReactNode
   content: string;
   position?: 'top' | 'rigth' | 'bottom' | 'left';
   delay?: number;
   disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
   children,
   content,
   position = 'right',
   delay = 300,
   disabled = false
}) => {
   const [isVisible, setIsVisible] = useState(false);
   const [tootltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

   const tooltipRef = useRef<HTMLDivElement>(null);
   const childRef = useRef<HTMLDivElement>(null);

   let timer: NodeJS.Timeout | null = null;

   useEffect(() => {
      const calculatePosition = () => {
         if (!isVisible || !childRef.current || !tooltipRef.current) return;

         const childRect = childRef.current.getBoundingClientRect();
         const tooltipRect = tooltipRef.current.getBoundingClientRect();

         let top = 0;
         let left = 0;

         switch (position) {
            case 'top':
               top = childRect.top - tooltipRect.height - 8;
               left = childRect.left + (childRect.width - tooltipRect.width) / 2;
               break;
            case 'right':
               top = childRect.top + (childRect.height - tooltipRect.height) / 2;
               left = childRect.right + 8;
               break;
            case 'bottom':
               top = childRect.bottom + 8;
               left = childRect.left + (childRect.width - tooltipRect.width) / 2;
               break;
            case 'left':
               top = childRect.top + (childRect.height - tooltipRect.height) / 2;
               left = childRect.left - tooltipRect.width - 8;
               break;
         }

         if (left < 0) left = 0;
         if (top < 0) top = 0;
         if (left + tooltipRect.width > window.innerWidth) {
            left = window.innerWidth - tooltipRect.width;
         }
         if (top + tooltipRect.height > window.innerHeight) {
            top = window.innerHeight - tooltipRect.height;
         }

         setTooltipPosition({ top, left });
      };

      calculatePosition();
      window.addEventListener('resize', calculatePosition);

      return () => {
         window.removeEventListener('resize', calculatePosition);
      };
   }, [isVisible, position]);

   const showTooltip = () => {
      if(disabled) return;
      timer = setTimeout(() => {
         setIsVisible(true);
      }, delay);
   };

   const hideTooltip = () => {
      if (timer) clearTimeout(timer);
      setIsVisible(false);
   };

   return (
         <div
            ref={childRef}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
            className="inline-block w-full"
         >
            {children}
         {isVisible && !disabled && (
            <div
               ref={tooltipRef}
               className="fixed z-50 bg-gray-800 text-white text-sm rounded py-1 px-2 shadow-lg pointer-events-none"
               style={{
                  top: `${tootltipPosition.top}px`,
                  left: `${tootltipPosition.left}px`,
               }}
               role="tooltip"
            >
               {content}
            </div>
         )}
      </div>
   );
};

export default Tooltip;