import React, { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', duration = 2000, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

    const displayMessage = typeof message === 'string' ? message : (message?.error || message?.message || "An unexpected error occurred");

    return (
        <div
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-8 py-4 rounded-xl shadow-2xl z-[9999] transition-all duration-300 animate-bounce-subtle border border-white/20`}
            style={{ minWidth: '320px', maxWidth: '90%', textAlign: 'center' }}
        >
            <div className="flex items-center justify-center gap-3">
                {type === 'error' ? (
                   <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) : (
                   <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                )}
                <span className="font-semibold">{displayMessage}</span>
            </div>
        </div>
    );
}
