import React, { useState } from 'react';
import { GoalFormData, TimePreference, DurationOption } from '../types';

interface GoalFormProps {
  onSubmit: (data: GoalFormData) => void;
  isLoading: boolean;
}

export const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState<number>(DurationOption.HOUR_1);
  const [preference, setPreference] = useState<TimePreference>(TimePreference.MORNING);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      durationMinutes: duration,
      preference,
      date
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      {/* Goal Name */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Goal Name
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Finish client proposal"
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-slate-800 placeholder:text-slate-400"
        />
      </div>

      {/* Duration & Date Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-medium text-slate-700">
            Duration
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white text-slate-800"
          >
            <option value={30}>30 Minutes</option>
            <option value={60}>1 Hour</option>
            <option value={90}>1.5 Hours</option>
            <option value={120}>2 Hours</option>
            <option value={180}>3 Hours</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-slate-700">
            Planning Date
          </label>
          <input
            id="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white text-slate-800"
          />
        </div>
      </div>

      {/* Time Preference */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Time Preference
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {Object.values(TimePreference).map((pref) => {
            const isSelected = preference === pref;
            // Shorten label for UI
            const label = pref.split(' ')[0]; 
            const time = pref.match(/\(.*\)/)?.[0] || '';
            
            return (
              <button
                key={pref}
                type="button"
                onClick={() => setPreference(pref)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="font-semibold text-sm">{label}</span>
                <span className="text-[10px] opacity-70">{time}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group transform active:scale-[0.98]"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analyzing Schedule...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span>Plan & Schedule (with AI)</span>
          </>
        )}
      </button>
    </form>
  );
};