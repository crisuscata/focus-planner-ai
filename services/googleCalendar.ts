import { gapi } from 'gapi-script';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPES = "https://www.googleapis.com/auth/calendar.events";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

export const initGoogleClient = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const start = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        resolve();
      })
      .catch((err: any) => {
        console.error("Error initializing Google Client", err);
        reject(err);
      });
    };
    gapi.load('client:auth2', start);
  });
};

export const signIn = async (): Promise<any> => {
  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.signIn();
};

export const signOut = async (): Promise<any> => {
  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.signOut();
};

export const isSignedIn = (): boolean => {
  const auth2 = gapi.auth2.getAuthInstance();
  return auth2?.isSignedIn.get() || false;
};

export const getUserProfile = (): any => {
    const auth2 = gapi.auth2.getAuthInstance();
    if (auth2?.isSignedIn.get()) {
        return auth2.currentUser.get().getBasicProfile();
    }
    return null;
}

export const getCalendarEvents = async (timeMin: string, timeMax: string): Promise<any[]> => {
  try {
    const response = await gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': timeMin,
      'timeMax': timeMax,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 50,
      'orderBy': 'startTime'
    });
    return response.result.items;
  } catch (error) {
    console.error("Error fetching calendar events", error);
    throw error;
  }
};
