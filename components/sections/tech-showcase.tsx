import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UniverseBackground } from './universe-background';

const TechShowcase = () => {
    const branches = [
        { name: "JEE", href: "/jee" },
        { name: "NEET", href: "/neet" },
        { name: "GATE", href: "/gate" },
        { name: "SSC", href: "/ssc" },
        { name: "Olympiad", href: "#" },
    ];

    const numBranches = branches.length;
    const radius = 42; // Percentage for the circle radius

    const getBranchPosition = (index: number) => {
        // -90 degrees to start the first item at the top-center
        const angleDeg = (360 / numBranches) * index - 90;
        const angleRad = (angleDeg * Math.PI) / 180;
        const left = 50 + radius * Math.cos(angleRad);
        const top = 50 + radius * Math.sin(angleRad);
        return { top: `${top}%`, left: `${left}%` };
    };

    return (
        <section className="bg-black text-white py-24 sm:py-32 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl">Explore Our Exam Universe</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">Your centralized hub for mastering competitive exams.</p>
                </div>

                <div className="relative max-w-xl mx-auto aspect-square">
                    {/* SVG Lines connecting center to branches */}
                    <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                        {branches.map((_, index) => {
                            const { top, left } = getBranchPosition(index);
                            return (
                                <line
                                    key={`line-${index}`}
                                    x1="50%"
                                    y1="50%"
                                    x2={left}
                                    y2={top}
                                    className="stroke-blue-500/30"
                                    strokeWidth="2"
                                />
                            );
                        })}
                    </svg>

                    {/* Central Hub */}
                    <div className="absolute top-1/2 left-1/2 w-[38%] h-[38%] -translate-x-1/2 -translate-y-1/2">
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

                    {/* Branch Nodes in a Circle */}
                    {branches.map((branch, index) => {
                        const position = getBranchPosition(index);
                        return (
                            <div
                                key={branch.name}
                                className="absolute -translate-x-1/2 -translate-y-1/2"
                                style={position}
                            >
                               <BranchNode branch={branch} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const BranchNode = ({ branch }: { branch: { name: string; href: string }; }) => {
    return (
        <Link href={branch.href} className="w-24 h-24 md:w-32 md:h-32 block">
            <div className="relative w-full h-full p-2 border border-gray-700 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-center transition-all duration-300 hover:bg-black/80 hover:border-blue-500/50 hover:scale-105 overflow-hidden">
                <UniverseBackground />
                <p className="relative z-10 font-semibold text-sm md:text-base">{branch.name}</p>
            </div>
        </Link>
    );
};

export default TechShowcase;
