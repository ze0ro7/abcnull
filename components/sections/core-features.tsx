"use client"

import { CheckCircle, Clock, BarChart, FileText, Video, Book } from "lucide-react";
import { motion } from "framer-motion";

const AnalyticsVisual = () => (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6 shadow-2xl shadow-blue-500/10">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <p className="text-sm text-slate-400">Test Analytics</p>
        </div>
        <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-white">Test Marks</h4>
                    <span className="text-2xl font-bold text-green-400">21</span>
                </div>
                <div className="h-20 w-full flex items-end space-x-2">
                    <div className="w-1/4 h-[60%] bg-blue-500 rounded-t-sm"></div>
                    <div className="w-1/4 h-[80%] bg-blue-500 rounded-t-sm"></div>
                    <div className="w-1/4 h-[40%] bg-blue-500 rounded-t-sm"></div>
                    <div className="w-1/4 h-[90%] bg-green-400 rounded-t-sm animate-pulse"></div>
                </div>
                <p className="text-right text-xs text-slate-500 mt-1">Latest Score: 24</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Questions Solved</h4>
                <div className="flex items-center justify-between">
                    <p className="text-slate-400">Aptitude: <span className="text-white font-semibold">200</span></p>
                    <p className="text-slate-400">Branch Core: <span className="text-white font-semibold">1100</span></p>
                </div>
            </div>
        </div>
    </div>
);

const MocksVisual = () => (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6 shadow-2xl shadow-purple-500/10">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <p className="text-sm text-slate-400">GATE Mock Test</p>
        </div>
        <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-white">General Aptitude</h4>
                    <p className="text-sm text-green-400">Completed</p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg flex items-center justify-between animate-pulse">
                <div>
                    <h4 className="font-semibold text-white">Engineering Mathematics</h4>
                    <p className="text-sm text-blue-400">In Progress</p>
                </div>
                <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between opacity-60">
                <div>
                    <h4 className="font-semibold text-slate-300">Computer Science</h4>
                    <p className="text-sm text-slate-400">Not Started</p>
                </div>
            </div>
             <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between opacity-60">
                <div>
                    <h4 className="font-semibold text-slate-300">Circuital and Core Branch</h4>
                    <p className="text-sm text-slate-400">Not Started</p>
                </div>
            </div>
        </div>
    </div>
);

const ResourcesVisual = () => (
     <div className="bg-gray-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6 shadow-2xl shadow-yellow-500/10">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <p className="text-sm text-slate-400">Resource Library</p>
        </div>
        <div className="space-y-3">
             <div className="bg-slate-800/50 hover:bg-slate-700/50 transition-colors cursor-pointer p-3 rounded-lg flex items-center space-x-4">
                <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-white">GATE Question Paper</h4>
                    <p className="text-sm text-slate-400">PDF Document</p>
                </div>
            </div>
             <div className="bg-slate-800/50 hover:bg-slate-700/50 transition-colors cursor-pointer p-3 rounded-lg flex items-center space-x-4">
                <Book className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-white">Advanced Engineering Books</h4>
                    <p className="text-sm text-slate-400">Books</p>
                </div>
            </div>
             <div className="bg-slate-800/50 hover:bg-slate-700/50 transition-colors cursor-pointer p-3 rounded-lg flex items-center space-x-4">
                <BarChart className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-white">Revision Notes and Flash Card</h4>
                    <p className="text-sm text-slate-400">Topic Notes</p>
                </div>
            </div>
        </div>
    </div>
);


const features = [
    {
        tag: "Analytics",
        title: "In-depth Performance Analytics",
        description: "Track your progress, identify your strengths and weaknesses, and get detailed insights into your test performance. Our analytics help you focus your study efforts where they matter most.",
        tags: ["Score Analysis", "Topic Breakdown", "Time Management"],
        visual: <AnalyticsVisual />,
        align: "left"
    },
    {
        tag: "Mocks",
        title: "Realistic Mock Tests",
        description: "Experience the real exam pressure with our full-length mock tests. Our tests are designed to simulate the actual GATE exam pattern and difficulty level, helping you build confidence and improve your time management skills.",
        tags: ["Real Exam Interface", "Adaptive Questions", "All India Rank"],
        visual: <MocksVisual />,
        align: "right"
    },
    {
        tag: "Resources",
        title: "Comprehensive Resource Library",
        description: "Access a vast collection of study materials, including previous year papers, detailed solutions, video lectures, and notes from top faculty. Everything you need to crack the exam is right at your fingertips.",
        tags: ["PYQs & Solutions", "Books", "Topic Notes"],
        visual: <ResourcesVisual />,
        align: "left"
    },
];

const FeatureCard = ({ feature }: { feature: (typeof features)[0] }) => {
    const isTextLeft = feature.align === 'left';
    
    const textContent = (
         <motion.div
            initial={{ opacity: 0, x: isTextLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center"
        >
            <span className="inline-block text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full mb-4 w-fit">{feature.tag}</span>
            <h3 className="font-heading text-3xl md:text-4xl text-white mb-4">{feature.title}</h3>
            <p className="text-slate-400 text-lg mb-6">{feature.description}</p>
            <div className="flex flex-wrap gap-2">
                {feature.tags.map(tag => (
                    <span key={tag} className="text-sm text-slate-300 border border-slate-700 bg-slate-800/50 px-3 py-1 rounded-full">{tag}</span>
                ))}
            </div>
        </motion.div>
    );

    const visualContent = (
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
             viewport={{ once: true, amount: 0.3 }}
        >
            {feature.visual}
        </motion.div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {isTextLeft ? textContent : visualContent}
            {isTextLeft ? visualContent : textContent}
        </div>
    )
}

export const CoreFeatures = () => {
    return (
        <div className="bg-black text-white py-24 sm:py-32">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16 md:mb-24">
                    <h2 className="font-heading text-4xl tracking-tight text-white sm:text-5xl">Discover Our Core Features</h2>
                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        Everything you need to succeed in your exams, all in one place.
                    </p>
                </div>
                <div className="space-y-20 md:space-y-28">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>
        </div>
    );
};
