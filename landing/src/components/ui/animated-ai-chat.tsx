"use client";

import { useEffect, useRef, useCallback, useTransition } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    ImageIcon,
    MonitorIcon,
    SendIcon,
    LoaderIcon,
    Sparkles,
    Command,
    Mic,
} from "lucide-react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import * as React from "react"

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Always reset to minHeight first to get accurate scrollHeight
            textarea.style.height = `${minHeight}px`;
            
            // Use requestAnimationFrame to ensure DOM has updated
            requestAnimationFrame(() => {
                if (!textarea) return;
                
                const newHeight = Math.max(
                    minHeight,
                    Math.min(
                        textarea.scrollHeight,
                        maxHeight ?? Number.POSITIVE_INFINITY
                    )
                );

                textarea.style.height = `${newHeight}px`;
            });
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

interface CommandSuggestion {
    icon: React.ReactNode;
    label: string;
    description: string;
    prefix: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    return (
      <div className={cn(
        "relative",
        containerClassName
      )}>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {showRing && isFocused && (
          <motion.span 
            className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-violet-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {props.onChange && (
          <div 
            className="absolute bottom-2 right-2 opacity-0 w-2 h-2 bg-violet-500 rounded-full"
            style={{
              animation: 'none',
            }}
            id="textarea-ripple"
          />
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export function AnimatedAIChat() {
    const [value, setValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [, startTransition] = useTransition();
    const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
    const [typewriterText, setTypewriterText] = useState("");
    const [isTypingAnimation, setIsTypingAnimation] = useState(true);
    const [charIndex, setCharIndex] = useState(0);
    const [pauseCounter, setPauseCounter] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [isExistingBusiness, setIsExistingBusiness] = useState(false);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 80,
        maxHeight: 220,
    });
    const [inputFocused, setInputFocused] = useState(false);
    const commandPaletteRef = useRef<HTMLDivElement>(null);

    const newIdeaCommands: CommandSuggestion[] = [
        { 
            icon: <ImageIcon className="w-4 h-4" />, 
            label: "Validate my startup idea", 
            description: "Complete validation with market fit", 
            prefix: "/validate" 
        },
        { 
            icon: <ImageIcon className="w-4 h-4" />, 
            label: "Analyze market potential", 
            description: "Deep dive into market opportunities", 
            prefix: "/analyze-market" 
        },
        { 
            icon: <MonitorIcon className="w-4 h-4" />, 
            label: "Draft a go-to-market strategy", 
            description: "Launch plan and customer acquisition", 
            prefix: "/gtm-strategy" 
        },
        { 
            icon: <Sparkles className="w-4 h-4" />, 
            label: "Refine my product concept", 
            description: "Product specs and feature roadmap", 
            prefix: "/refine-product" 
        },
    ];

    const existingBusinessCommands: CommandSuggestion[] = [
        { 
            icon: <ImageIcon className="w-4 h-4" />, 
            label: "Optimize my business model", 
            description: "Improve efficiency and profitability", 
            prefix: "/optimize" 
        },
        { 
            icon: <ImageIcon className="w-4 h-4" />, 
            label: "Expand to new markets", 
            description: "Growth opportunities and expansion", 
            prefix: "/expand-markets" 
        },
        { 
            icon: <MonitorIcon className="w-4 h-4" />, 
            label: "Improve customer retention", 
            description: "Strategies to keep customers longer", 
            prefix: "/retention" 
        },
        { 
            icon: <Sparkles className="w-4 h-4" />, 
            label: "Scale my operations", 
            description: "Systems and processes for growth", 
            prefix: "/scale-ops" 
        },
    ];

    const commandSuggestions = isExistingBusiness ? existingBusinessCommands : newIdeaCommands;

    const newIdeaPlaceholders = [
        "I want to create an AI-powered fitness app for busy professionals",
        "I want to create a sustainable food delivery service for college campuses", 
        "I want to create a B2B SaaS tool for remote team collaboration",
        "I want to create a subscription-based meal prep service for millennials",
        "I want to create a mobile app connecting local artisans with customers",
        "I want to create an online marketplace for vintage furniture and decor",
        "I want to create a fintech app for freelancer expense management",
        "I want to create a mental health platform for remote workers"
    ];

    const existingBusinessPlaceholders = [
        "I run a small coffee shop and want to increase customer retention",
        "My SaaS startup has 100 users but growth has stalled",
        "I have a consulting business and want to scale beyond my time",
        "My e-commerce store needs better conversion rates",
        "I own a local gym and want to expand to a second location",
        "My agency is profitable but I want to improve operations",
        "My restaurant has loyal customers but low profit margins",
        "My online course business needs more effective marketing"
    ];

    const placeholderTexts = isExistingBusiness ? existingBusinessPlaceholders : newIdeaPlaceholders;

    useEffect(() => {
        if (value.startsWith('/') && !value.includes(' ')) {
            setShowCommandPalette(true);
            
            const matchingSuggestionIndex = commandSuggestions.findIndex(
                (cmd) => cmd.prefix.startsWith(value)
            );
            
            if (matchingSuggestionIndex >= 0) {
                setActiveSuggestion(matchingSuggestionIndex);
            } else {
                setActiveSuggestion(-1);
            }
        } else {
            setShowCommandPalette(false);
        }
    }, [value]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Typewriter animation effect
    useEffect(() => {
        if (inputFocused || value) {
            return; // Don't animate when user is focused or typing
        }

        const currentIdea = placeholderTexts[currentPlaceholderIndex];
        
        const typewriterInterval = setInterval(() => {
            if (isTypingAnimation) {
                // Typing phase
                if (charIndex < currentIdea.length) {
                    setTypewriterText(currentIdea.slice(0, charIndex + 1));
                    setCharIndex(prev => prev + 1);
                    setPauseCounter(0); // Reset pause counter
                } else {
                    // Pause at end
                    if (pauseCounter < 40) { // 40 * 50ms = 2 second pause
                        setPauseCounter(prev => prev + 1);
                    } else {
                        setIsTypingAnimation(false);
                        setPauseCounter(0);
                    }
                }
            } else {
                // Deleting phase
                if (charIndex > 0) {
                    setTypewriterText(currentIdea.slice(0, charIndex - 1));
                    setCharIndex(prev => prev - 1);
                } else {
                    // Move to next idea and start typing
                    setCurrentPlaceholderIndex(prev => (prev + 1) % placeholderTexts.length);
                    setIsTypingAnimation(true);
                }
            }
        }, isTypingAnimation ? 50 : 30); // Slower typing, faster deleting

        return () => clearInterval(typewriterInterval);
    }, [inputFocused, value, currentPlaceholderIndex, charIndex, isTypingAnimation, placeholderTexts, pauseCounter]);

    // Reset typewriter when switching between modes
    useEffect(() => {
        setCurrentPlaceholderIndex(0);
        setCharIndex(0);
        setTypewriterText("");
        setIsTypingAnimation(true);
        setPauseCounter(0);
    }, [isExistingBusiness]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const commandButton = document.querySelector('[data-command-button]');
            
            if (commandPaletteRef.current && 
                !commandPaletteRef.current.contains(target) && 
                !commandButton?.contains(target)) {
                setShowCommandPalette(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showCommandPalette) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveSuggestion(prev => 
                    prev < commandSuggestions.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveSuggestion(prev => 
                    prev > 0 ? prev - 1 : commandSuggestions.length - 1
                );
            } else if (e.key === 'Tab' || e.key === 'Enter') {
                e.preventDefault();
                if (activeSuggestion >= 0) {
                    const selectedCommand = commandSuggestions[activeSuggestion];
                    setValue(selectedCommand.prefix + ' ');
                    setShowCommandPalette(false);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setShowCommandPalette(false);
            }
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                handleSendMessage();
            }
        }
    };

    const handleSendMessage = () => {
        if (value.trim()) {
            startTransition(() => {
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    setValue("");
                    adjustHeight(true);
                }, 3000);
            });
        }
    };


    
    const selectCommandSuggestion = (index: number) => {
        const selectedCommand = commandSuggestions[index];
        setValue(selectedCommand.prefix + ' ');
        setShowCommandPalette(false);
    };

    const handleMicrophoneClick = () => {
        setIsRecording(!isRecording);
        // TODO: Implement voice recording functionality
    };

    return (
        <div className="w-full max-w-5xl mx-auto relative">
            <motion.div 
                className="relative z-10 space-y-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: cubicBezier(0.4,0,0.2,1) }}
            >
                <motion.div 
                    className="relative bg-white/[0.06] backdrop-blur-2xl rounded-2xl border border-white/[0.12] shadow-2xl w-full max-w-4xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: cubicBezier(0.4,0,0.2,1) }}
                >
                    <AnimatePresence>
                        {showCommandPalette && (
                            <motion.div 
                                ref={commandPaletteRef}
                                className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-black/90 rounded-lg z-50 shadow-lg border border-white/10 overflow-hidden"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.15 }}
                            >
                                <div className="py-1 bg-black/95">
                                    {commandSuggestions.map((suggestion, index) => (
                                        <motion.div
                                            key={suggestion.prefix}
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-2 text-xs transition-colors cursor-pointer",
                                                activeSuggestion === index 
                                                    ? "bg-white/10 text-white" 
                                                    : "text-white/70 hover:bg-white/5"
                                            )}
                                            onClick={() => selectCommandSuggestion(index)}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.03 }}
                                        >
                                            <div className="w-5 h-5 flex items-center justify-center text-white/60">
                                                {suggestion.icon}
                                            </div>
                                            <div className="font-medium">{suggestion.label}</div>
                                            <div className="text-white/40 text-xs ml-1">
                                                {suggestion.prefix}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="p-6">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setValue(newValue);
                                
                                // If text is completely deleted, reset height
                                if (newValue.trim() === "") {
                                    adjustHeight(true);
                                } else {
                                    adjustHeight();
                                }
                            }}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            placeholder={`${typewriterText}${(isTypingAnimation && pauseCounter === 0) || (!isTypingAnimation && charIndex > 0) ? '|' : ''}`}
                            containerClassName="w-full"
                            className={cn(
                                "w-full px-3 py-4",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-white/95 text-base",
                                "focus:outline-none",
                                "placeholder:text-white/40",
                                "min-h-[80px]"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                            showRing={false}
                        />
                    </div>



                    <div className="px-6 py-4 border-t border-white/[0.12] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            {/* Business Mode Toggle - First */}
                            <div className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.08]">
                                <motion.button
                                    type="button"
                                    onClick={() => setIsExistingBusiness(false)}
                                    whileTap={{ scale: 0.95 }}
                                    className={cn(
                                        "px-2 py-1 rounded text-xs font-medium transition-all relative whitespace-nowrap",
                                        !isExistingBusiness 
                                            ? "text-white bg-white/[0.08]" 
                                            : "text-white/50 hover:text-white/70"
                                    )}
                                >
                                    <span className="hidden sm:inline">New Idea</span>
                                    <span className="sm:hidden">New</span>
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={() => setIsExistingBusiness(true)}
                                    whileTap={{ scale: 0.95 }}
                                    className={cn(
                                        "px-2 py-1 rounded text-xs font-medium transition-all relative whitespace-nowrap",
                                        isExistingBusiness 
                                            ? "text-white bg-white/[0.08]" 
                                            : "text-white/50 hover:text-white/70"
                                    )}
                                >
                                    <span className="hidden sm:inline">Live Business</span>
                                    <span className="sm:hidden">Live</span>
                                </motion.button>
                            </div>

                            <motion.button
                                type="button"
                                data-command-button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowCommandPalette(prev => !prev);
                                }}
                                whileTap={{ scale: 0.94 }}
                                className={cn(
                                    "p-2 text-white/40 hover:text-white/90 rounded-lg transition-colors relative group",
                                    showCommandPalette && "bg-white/10 text-white/90"
                                )}
                            >
                                <Command className="w-4 h-4" />
                                <motion.span
                                    className="absolute inset-0 bg-white/[0.05] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    layoutId="button-highlight"
                                />
                            </motion.button>
                            
                            <motion.button
                                type="button"
                                onClick={handleMicrophoneClick}
                                whileTap={{ scale: 0.94 }}
                                className={cn(
                                    "p-2 rounded-lg transition-all relative group hidden",
                                    isRecording 
                                        ? "text-red-400 bg-red-500/10" 
                                        : "text-white/40 hover:text-white/90"
                                )}
                            >
                                <Mic className="w-4 h-4" />
                                
                                {/* Recording Animation */}
                                {isRecording && (
                                    <>
                                        <motion.span
                                            className="absolute inset-0 rounded-lg border border-red-500/50"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                opacity: [0.5, 0.8, 0.5],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                        <motion.span
                                            className="absolute inset-0 rounded-lg bg-red-500/20"
                                            animate={{
                                                opacity: [0.2, 0.4, 0.2],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </>
                                )}
                                
                                <motion.span
                                    className="absolute inset-0 bg-white/[0.05] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    layoutId="button-highlight-mic"
                                />
                            </motion.button>
                        </div>
                        
                        <motion.button
                            type="button"
                            onClick={handleSendMessage}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isTyping || !value.trim()}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                "flex items-center gap-2",
                                value.trim()
                                    ? "bg-white text-[#0A0A0B] shadow-lg shadow-white/10"
                                    : "bg-white/[0.05] text-white/40"
                            )}
                        >
                            {isTyping ? (
                                <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                            ) : (
                                <SendIcon className="w-4 h-4" />
                            )}
                            <span>Generate</span>
                        </motion.button>
                    </div>
                </motion.div>


            </motion.div>



            {inputFocused && (
                <motion.div 
                    className="fixed w-[50rem] h-[50rem] rounded-full pointer-events-none z-0 opacity-[0.02] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 blur-[96px]"
                    animate={{
                        x: mousePosition.x - 400,
                        y: mousePosition.y - 400,
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 150,
                        mass: 0.5,
                    }}
                />
            )}
        </div>
    );
}





const rippleKeyframes = `
@keyframes ripple {
  0% { transform: scale(0.5); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}
`;

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = rippleKeyframes;
    document.head.appendChild(style);
}