import { GoalFormData, TimePreference, ScheduledEvent, CalendarSlot } from '../types';
import { GoogleGenAI } from "@google/genai";
import { isSignedIn, getCalendarEvents } from './googleCalendar';

// Mocking the "Cloud Function" logic on the client side for the MVP demo
// In a real app, this would be the GCP Cloud Function logic

const getPreferenceHours = (pref: TimePreference): { startHour: number; endHour: number } => {
  switch (pref) {
    case TimePreference.MORNING: return { startHour: 8, endHour: 12 };
    case TimePreference.AFTERNOON: return { startHour: 12, endHour: 17 };
    case TimePreference.EVENING: return { startHour: 17, endHour: 21 };
  }
};

const fallbackMockBusySlots = (dateStr: string, startHour: number, endHour: number): CalendarSlot[] => {
  const busySlots: CalendarSlot[] = [];
  const baseDate = new Date(dateStr);

  // Randomly generate 0-2 busy events in the preferred window
  const numEvents = Math.floor(Math.random() * 3);

  for (let i = 0; i < numEvents; i++) {
    const eventStartHour = startHour + Math.random() * (endHour - startHour - 1);
    const start = new Date(baseDate);
    start.setHours(Math.floor(eventStartHour), Math.floor(Math.random() * 2) * 30, 0, 0);

    const end = new Date(start);
    end.setMinutes(start.getMinutes() + (Math.random() > 0.5 ? 30 : 60));

    busySlots.push({ start, end });
  }

  return busySlots.sort((a, b) => a.start.getTime() - b.start.getTime());
};

const getBusySlots = async (dateStr: string, startHour: number, endHour: number): Promise<CalendarSlot[]> => {
  if (isSignedIn()) {
    const start = new Date(dateStr);
    start.setHours(startHour, 0, 0, 0);
    const end = new Date(dateStr);
    end.setHours(endHour, 0, 0, 0);

    try {
      const events = await getCalendarEvents(start.toISOString(), end.toISOString());
      return events.map((e: any) => ({
        start: new Date(e.start.dateTime || e.start.date),
        end: new Date(e.end.dateTime || e.end.date)
      })).sort((a: any, b: any) => a.start.getTime() - b.start.getTime());
    } catch (err) {
      console.error("Failed to fetch Google Calendar events, using mock", err);
      // Fallback to mock on error
    }
  }
  return fallbackMockBusySlots(dateStr, startHour, endHour);
};

const findAvailableSlot = (
  dateStr: string,
  durationMinutes: number,
  startHour: number,
  endHour: number,
  busySlots: CalendarSlot[]
): { start: Date; end: Date } | null => {

  let currentTime = new Date(dateStr);
  currentTime.setHours(startHour, 0, 0, 0);

  const windowEnd = new Date(dateStr);
  windowEnd.setHours(endHour, 0, 0, 0);

  // Simple linear search for a gap
  while (currentTime.getTime() + durationMinutes * 60000 <= windowEnd.getTime()) {
    const potentialEnd = new Date(currentTime.getTime() + durationMinutes * 60000);

    // Check if this slot overlaps with any busy slot
    const hasOverlap = busySlots.some(busy => {
      return (currentTime < busy.end && potentialEnd > busy.start);
    });

    if (!hasOverlap) {
      return { start: new Date(currentTime), end: potentialEnd };
    }

    // If overlap, move forward by 15 mins
    currentTime.setMinutes(currentTime.getMinutes() + 15);
  }

  return null;
};

// Use Gemini to generate a context-aware motivational quote
const getMotivationalQuote = async (goalTitle: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Focus is the key to success. You got this!"; // Fallback
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, punchy, motivational quote (max 15 words) specifically for someone about to work on this task: "${goalTitle}". Be encouraging but direct.`,
    });
    return response.text.trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error("Gemini API Error", error);
    return "The secret of getting ahead is getting started.";
  }
};

export const scheduleGoal = async (data: GoalFormData): Promise<ScheduledEvent> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { startHour, endHour } = getPreferenceHours(data.preference);
  let busySlots = await getBusySlots(data.date, startHour, endHour);
  let slot = findAvailableSlot(data.date, data.durationMinutes, startHour, endHour, busySlots);
  let isNextDay = false;

  // Error Handling: If no slot found, try next day same preference
  if (!slot) {
    const nextDay = new Date(data.date);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];

    // Fetch busy slots for next day
    busySlots = await getBusySlots(nextDayStr, startHour, endHour);
    slot = findAvailableSlot(nextDayStr, data.durationMinutes, startHour, endHour, busySlots);
    isNextDay = true;
  }

  if (!slot) {
    throw new Error("Could not find a slot even on the next day. Please try a different time preference.");
  }

  const quote = await getMotivationalQuote(data.title);

  return {
    title: data.title,
    startTime: slot.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    endTime: slot.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    motivationalQuote: quote,
    isSuccess: true,
    message: isNextDay
      ? `Full schedule today! We found a perfect spot for you tomorrow (${new Date(slot.start).toLocaleDateString()}).`
      : "Great news! We found a focus slot for you."
  };
};