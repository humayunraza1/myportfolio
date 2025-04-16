import { useState, useCallback, useRef, useEffect } from "react";
import { ZoomIn, ZoomOut, Maximize, Minimize, X, RotateCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ImageViewer = ({ isOpen, onClose, image }) => {
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Reset position, scale, and rotation when image changes or dialog opens/closes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  }, [image, isOpen]);

  // Update fullscreen state if changed externally
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // RAF for smoother animation
  useEffect(() => {
    let animationFrameId;
    let targetPosition = position;
    let currentPosition = { ...position };
    const SMOOTHING_FACTOR = 0.2; // Adjust for more/less smoothing

    const animate = () => {
      if (isDragging) {
        // If currently dragging, don't apply smoothing
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Calculate the distance to target
      const dx = targetPosition.x - currentPosition.x;
      const dy = targetPosition.y - currentPosition.y;
      
      // Small threshold to stop animation when close enough
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        currentPosition = { ...targetPosition };
        setPosition(currentPosition);
        return;
      }
      
      // Apply smoothing
      currentPosition.x += dx * SMOOTHING_FACTOR;
      currentPosition.y += dy * SMOOTHING_FACTOR;
      
      setPosition({ ...currentPosition });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDragging]);

  const zoomIn = useCallback(() => {
    setScale(prevScale => Math.min(prevScale + 0.25, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prevScale => {
      const newScale = Math.max(prevScale - 0.25, 0.5);
      
      // If we're zooming out to 1 or below, reset position
      if (newScale <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      
      return newScale;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const rotateImage = useCallback(() => {
    setRotation(prevRotation => (prevRotation + 90) % 360);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      const container = containerRef.current;
      if (container) {
        container.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(err => {
          console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(err => {
          console.log(`Error attempting to exit fullscreen: ${err.message}`);
        });
      }
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    // Only allow dragging when zoomed in
    if (scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ 
        x: e.clientX - position.x, 
        y: e.clientY - position.y 
      });
    }
  }, [scale, position]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && scale > 1) {
      e.preventDefault();
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Direct update for responsiveness during drag
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, dragStart, scale]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (scale > 1 && e.touches.length === 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      });
    }
  }, [scale, position]);

  const handleTouchMove = useCallback((e) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      e.preventDefault();
      const newX = e.touches[0].clientX - dragStart.x;
      const newY = e.touches[0].clientY - dragStart.y;
      
      // Direct update for responsiveness during drag
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, dragStart, scale]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle wheel for zoom in/out
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      // Wheel up - zoom in
      setScale(prevScale => Math.min(prevScale + 0.1, 3));
    } else {
      // Wheel down - zoom out
      setScale(prevScale => {
        const newScale = Math.max(prevScale - 0.1, 0.5);
        if (newScale <= 1) {
          setPosition({ x: 0, y: 0 });
        }
        return newScale;
      });
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="bg-[#0d0d0d] border-gray-800 p-0 max-w-[95vw] max-h-[95vh] overflow-hidden"
      >
        <DialogClose className="absolute right-4 top-4 z-20">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </DialogClose>
        
        {/* Image container */}
        <div 
          ref={containerRef}
          className="w-full h-full flex items-center justify-center bg-[#0d0d0d] image-viewer-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          style={{ 
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            userSelect: 'none',
            touchAction: 'none',
          }}
        >
          {image && (
            <div 
              ref={imageRef}
              style={{ 
                transform: `rotate(${rotation}deg) scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`, 
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                transformOrigin: 'center',
                maxWidth: rotation % 180 === 0 ? '100%' : '80%',
                maxHeight: rotation % 180 === 0 ? '80%' : '100%',
                willChange: 'transform'
              }}
            >
              <img
                src={image}
                alt="Project screenshot"
                className="object-contain max-w-full max-h-[80vh]"
                onDoubleClick={resetZoom}
                draggable="false"
                style={{ 
                  pointerEvents: 'none',
                  display: 'block'
                }}
              />
            </div>
          )}
        </div>
        
        {/* Zoom controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-[#1a1a1a] p-2 rounded-lg z-20">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white h-8 w-8"
            onClick={zoomOut}
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <div className="text-gray-300 text-sm min-w-12 text-center">
            {Math.round(scale * 100)}%
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white h-8 w-8"
            onClick={zoomIn}
            disabled={scale >= 3}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-4 bg-gray-700 mx-2"></div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white h-8 w-8"
            onClick={rotateImage}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-4 bg-gray-700 mx-2"></div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white h-8 w-8"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewer;