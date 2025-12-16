import React from 'react';

interface LoginLandingProps {
    onLogin: () => void;
}

export const LoginLanding: React.FC<LoginLandingProps> = ({ onLogin }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
                {/* Logo / Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-500/30 mb-4 transform hover:scale-105 transition-transform duration-300">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                {/* Headings */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                        Focus Planner <span className="text-indigo-400">AI</span>
                    </h1>
                    <p className="text-lg text-slate-300 font-medium">
                        Master your schedule. Conquer your day.
                    </p>
                </div>

                {/* Value Props */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/5 text-left shadow-xl">
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-3 mt-0.5">✓</span>
                            <span className="text-slate-200 text-sm">AI-powered scheduling based on your energy levels</span>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-3 mt-0.5">✓</span>
                            <span className="text-slate-200 text-sm">Smart integration with your Google Calendar</span>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mr-3 mt-0.5">✓</span>
                            <span className="text-slate-200 text-sm">Motivation tailored to your specific tasks</span>
                        </li>
                    </ul>
                </div>

                {/* CTA Button */}
                <button
                    onClick={onLogin}
                    className="w-full group relative flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-indigo-50 px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-indigo-900/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                    <div className="absolute inset-0 rounded-xl ring-2 ring-white/50 group-hover:ring-indigo-400/50 transition-all duration-300"></div>
                </button>

                <p className="text-xs text-slate-500 mt-4">
                    By continuing, you agree to organize your life effectively.
                </p>
            </div>
        </div>
    );
};
