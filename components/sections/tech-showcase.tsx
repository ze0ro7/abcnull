import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UniverseBackground } from './universe-background';
const TechShowcase = () => {
    const branches = [
        { name: "JEE", href: "/jee", position: "col-start-1 row-start-1" },
        { name: "NEET", href: "/neet", position: "col-start-3 row-start-1" },
        { name: "GATE", href: "/gate", position: "col-start-1 row-start-3" },
        { name: "SSC", href: "/ssc", position: "col-start-3 row-start-3" },
        { name: "Olympiad", href: "#", position: "col-start-2 row-start-3" },
    ];

    return (
        <section className="bg-black text-white py-24 sm:py-32 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl">Explore Our Exam Universe</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">Your centralized hub for mastering competitive exams.</p>
                </div>

                <div className="relative max-w-2xl mx-auto aspect-square">
                     {/* Background Gradient Lines */}
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
                    </div>

                    {/* Grid for Nodes */}
                    <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-2 md:gap-4 w-full h-full">
                        
                        {/* Central Hub */}
                        <div className="col-start-2 row-start-2 flex items-center justify-center">
                            <div className="relative w-full h-full border-2 border-blue-500/50 rounded-lg flex items-center justify-center bg-gray-900/50 backdrop-blur-sm shadow-[0_0_40px_-10px_theme(colors.blue.500)] p-4">
                                <Image 
                                    src="/images/qprep-logo.png" 
                                    alt="Qprep Logo" 
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="p-1"
                                />
                                <div className="absolute -inset-1 border-2 border-blue-400 rounded-lg blur-md opacity-40 animate-pulse"></div>
                            </div>
                        </div>

                        {/* Branch Nodes */}
                        {branches.map(branch => (
                           <BranchNode key={branch.name} branch={branch} className={branch.position} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const BranchNode = ({ branch, className }: { branch: { name: string; href: string }; className?: string }) => {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            <Link href={branch.href} className="w-24 h-24 md:w-32 md:h-32">
                <div className="relative w-full h-full p-2 border border-gray-700 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-center transition-all duration-300 hover:bg-gray-900/80 hover:border-blue-500/50 hover:scale-105 overflow-hidden">
                <UniverseBackground/>
                    <p className="relative z-10 font-semibold text-sm md:text-base">{branch.name}</p>
                </div>
            </Link>
        </div>
    );
};

export default TechShowcase;
