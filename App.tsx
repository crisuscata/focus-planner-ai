import React, { useState } from 'react';
import { GoalForm } from './components/GoalForm';
import { ResultCard } from './components/ResultCard';
import { CloudFunctionBlueprint } from './components/CloudFunctionBlueprint';
import { CalendarConnect } from './components/CalendarConnect';
import { GoalFormData, ScheduledEvent } from './types';
import { scheduleGoal } from './services/schedulerService';

const App: React.FC = () => {
  const [scheduledEvent, setScheduledEvent] = useState<ScheduledEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);

  const handleGoalSubmit = async (data: GoalFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await scheduleGoal(data);
      setScheduledEvent(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setScheduledEvent(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
      <div className="max-w-4xl mx-auto relative">
        <CalendarConnect onConnectionChange={setIsCalendarConnected} />

        {/* Header Section */}
        <header className="text-center mb-10 pt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-200">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Focus Planner <span className="text-indigo-600">AI</span>
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-xl mx-auto">
            Intelligent daily scheduling powered by AI. We find the perfect slot for your deep work and keep you motivated.
          </p>
        </header>

        {/* Main Content Area */}
        <main className="transition-all duration-500 ease-in-out">
          {error && (
            <div className="max-w-md mx-auto mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!scheduledEvent ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-10 border border-white/20">
              <GoalForm onSubmit={handleGoalSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <ResultCard event={scheduledEvent} onReset={handleReset} />
          )}
        </main>

        {/* Developer / Blueprint Section */}
        <footer className="mt-16 border-t border-slate-200 pt-8">
          <div className="text-center mb-6">
            <button
              onClick={() => setShowBlueprint(!showBlueprint)}
              className="text-slate-500 hover:text-indigo-600 text-sm font-medium underline underline-offset-4 decoration-slate-300 hover:decoration-indigo-300 transition-all"
            >
              {showBlueprint ? 'Hide Architecture Blueprint' : 'View Backend Blueprint (Cloud Function)'}
            </button>
          </div>

          {showBlueprint && (
            <div className="animate-fade-in-up">
              <CloudFunctionBlueprint />
            </div>
          )}

          <div className="mt-8 text-center text-xs text-slate-400">
            <p>© 2024 Focus Planner AI. Optimized for Deep Work.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;