import React from 'react';
import { ScheduledEvent } from '../types';

interface ResultCardProps {
  event: ScheduledEvent;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ event, onReset }) => {
  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-green-50 p-6 border-b border-green-100 flex items-start gap-4">
          <div className="bg-green-100 p-2 rounded-full text-green-600 flex-shrink-0">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
             </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-900">Event Scheduled!</h3>
            <p className="text-green-700 text-sm mt-1">{event.message}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Time Slot</p>
              <div className="text-xl font-bold text-slate-800">
                {event.startTime} - {event.endTime}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Goal</p>
              <div className="font-medium text-slate-800">{event.title}</div>
            </div>
          </div>

          {/* AI Motivation Section */}
          <div className="relative">
            <div className="absolute top-0 left-0 -mt-2 -ml-2 text-indigo-200">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9 14.938 9.92386 14.0761 11.0028 13.924L11.7583 13.8175C12.9839 13.6448 13.7844 12.4468 13.4374 11.2625L13.1165 10.1673C12.8727 9.33519 13.6309 8.56214 14.4754 8.7617L15.4227 8.98553C16.5376 9.24898 17.6534 8.52906 17.8596 7.40464L18.1506 5.8174C18.4286 4.3014 17.2882 2.89597 15.756 2.89597H11.7454C9.55999 2.89597 7.55837 3.99309 6.36884 5.80374L3.75486 9.78208C3.26732 10.524 3 11.3915 3 12.2812V19C3 20.1046 3.89543 21 5 21H14.017ZM17 19H19C20.1046 19 21 18.1046 21 17V12C21 10.8954 20.1046 10 19 10H17V19Z" />
              </svg>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 text-center relative z-10">
              <p className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wide">AI Motivation</p>
              <p className="text-indigo-900 italic text-lg leading-relaxed font-medium">"{event.motivationalQuote}"</p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400">
            *Added to Primary Calendar • Notification set 10m before
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-center">
          <button 
            onClick={onReset}
            className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Plan Another Goal
          </button>
        </div>
      </div>
    </div>
  );
};