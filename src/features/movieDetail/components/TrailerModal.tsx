import { useEffect } from "react";

type TrailerModalProps = {
    isOpen: boolean;
    onClose: () => void;
    trailerUrl: string;
    movieTitle: string;
};

export const TrailerModal = ({ isOpen, onClose, trailerUrl, movieTitle }: TrailerModalProps) => {
    // Close modal khi nhấn ESC
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Convert YouTube watch URL to embed URL
    const embedUrl = trailerUrl?.replace('watch?v=', 'embed/') || '';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center  p-4"
            onClick={onClose}
            style={{ background: 'rgba(0,0,0,0.75)' }}
        >
            <div
                className="bg-white rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal content
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">
                        Trailer - {movieTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* Video Container */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    {/* 16:9 Aspect Ratio */}
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={embedUrl}
                        title={`Trailer - ${movieTitle}`}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

// TrailerModal: Component modal xem trailer YouTube
// - Overlay đen mờ với backdrop click to close
// - Modal card trắng với header + close button
// - YouTube iframe embed với 16:9 aspect ratio
// - ESC key to close
// - Prevent background scroll khi modal open
// - Click outside modal → close
// - Click vào modal content → không close
