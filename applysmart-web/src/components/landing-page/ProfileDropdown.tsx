// Profile dropdown component
"use client"

import { User, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ProfileDropdownProps } from "@/types/landingpage";

export function ProfileDropdown({user, logout}: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    // Reference boundary for dropdown element
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If the click is outside dropdown container boundary, shut the menu down
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        // Attach global document mouse listener when open
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Clean up structural listeners naturally on unmount or toggle
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground hover:bg-muted/60 transition-all duration-150"
            >
                <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                    <User size={12} className="text-primary" />
                </div>
                <span className="text-sm max-w-25 truncate">{user?.name}</span>
                <ChevronDown 
                    size={14} 
                    className={`text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-20 origin-top-right animate-in fade-in slide-in-from-top-2 duration-150 ease-out">
                    <div className="p-3 border-b border-border">
                        <p className="text-sm font-medium text-foreground truncate">
                            {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {user?.email}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
                    >
                        <LogOut size={13} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}