'use client';

import { useState, useRef, useEffect } from 'react';
import './modal.css';

interface ModalProps {
  title?: string;
  description?: string;
}

function Modal({ title = 'Delete File', description = 'Are you sure?' }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle ESC key and focus trap
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // ESC closes modal
            if (e.key === 'Escape') {
                setIsOpen(false);
                return;
            }

            // Tab focus trap
            if (e.key === 'Tab' && modalRef.current) {
                const focusableButtons = modalRef.current.querySelectorAll('button');
                if (focusableButtons.length === 0) return;

                const firstButton = focusableButtons[0] as HTMLElement;
                const lastButton = focusableButtons[focusableButtons.length - 1] as HTMLElement;
                const activeElement = document.activeElement as HTMLElement;

                // Shift+Tab from first button - go to last
                if (e.shiftKey && activeElement === firstButton) {
                    e.preventDefault();
                    lastButton.focus();
                }
                // Tab from last button - go to first
                else if (!e.shiftKey && activeElement === lastButton) {
                    e.preventDefault();
                    firstButton.focus();
                }
            }
        };

        // Focus modal when opened
        if (modalRef.current) {
            modalRef.current.focus();
        }

        document.addEventListener('keydown', handleKeyDown);

        // Restore focus to trigger button when closed
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (!isOpen && triggerRef.current) {
                triggerRef.current.focus();
            }
        };
    }, [isOpen]);

    return(
        <>
            <button 
                ref={triggerRef}
                onClick={() => setIsOpen(true)}
            >
                Open Modal
            </button>

            {isOpen && (
                <div className="overlay" onClick={() => setIsOpen(false)}>
                    <div 
                        ref={modalRef}
                        className="modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="dialog-title"
                        aria-describedby="dialog-description"
                        tabIndex={-1}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 id="dialog-title">{title}</h2>

                        <p id="dialog-description">{description}</p>

                        <button onClick={() => setIsOpen(false)}>cancel</button>
                        <button onClick={() => setIsOpen(false)}>delete</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
