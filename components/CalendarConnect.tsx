import React, { useEffect, useState } from 'react';
import { initGoogleClient, signIn, signOut, isSignedIn, getUserProfile } from '../services/googleCalendar';

interface CalendarConnectProps {
    onConnectionChange: (connected: boolean) => void;
}

export const CalendarConnect: React.FC<CalendarConnectProps> = ({ onConnectionChange }) => {
    const [connected, setConnected] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initGoogleClient()
            .then(() => {
                const signedIn = isSignedIn();
                setConnected(signedIn);
                onConnectionChange(signedIn);
                if (signedIn) {
                    const profile = getUserProfile();
                    setUserEmail(profile?.getEmail());
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to init GAPI", err);
                setLoading(false);
            });
    }, [onConnectionChange]);

    const handleSignIn = async () => {
        try {
            await signIn();
            setConnected(true);
            onConnectionChange(true);
            const profile = getUserProfile();
            setUserEmail(profile?.getEmail());
        } catch (error) {
            console.error("Sign in failed", error);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        setConnected(false);
        setUserEmail(null);
        onConnectionChange(false);
    };

    if (loading) {
        return <div className="text-xs text-slate-400">Loading Calendar...</div>;
    }

    return (
        <div className="absolute top-4 right-4 flex flex-col items-end">
            {connected ? (
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-indigo-100">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-700">
                        {userEmail || 'Connected'}
                    </span>
                    <button
                        onClick={handleSignOut}
                        className="text-xs text-slate-400 hover:text-red-500 ml-1 transition-colors"
                    >
                        (Disconnect)
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleSignIn}
                    className="flex items-center gap-2 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-slate-200 transition-all duration-200"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    Connect Calendar
                </button>
            )}
        </div>
    );
};
