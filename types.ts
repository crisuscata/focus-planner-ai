export enum TimePreference {
  MORNING = 'Morning (08:00 - 12:00)',
  AFTERNOON = 'Afternoon (12:00 - 17:00)',
  EVENING = 'Evening (17:00 - 21:00)',
}

export enum DurationOption {
  MIN_30 = 30,
  HOUR_1 = 60,
  HOUR_1_5 = 90,
  HOUR_2 = 120,
  HOUR_3 = 180,
}

export interface GoalFormData {
  title: string;
  durationMinutes: number;
  preference: TimePreference;
  date: string;
}

export interface ScheduledEvent {
  title: string;
  startTime: string;
  endTime: string;
  motivationalQuote: string;
  isSuccess: boolean;
  message?: string;
}

export interface CalendarSlot {
  start: Date;
  end: Date;
}