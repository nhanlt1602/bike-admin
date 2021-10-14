// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, MessagePayload, onMessage } from "firebase/messaging";
import {
    API_KEY,
    APP_ID,
    AUTH_DOMAIN,
    CLOUD_MESSAGING_TOKEN,
    MEASUREMENT_ID,
    MESSAGING_SENDER_ID,
    PROJECT_ID,
    STORAGE_BUCKET,
} from "src/configurations";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const messaging = getMessaging(app);

export const getTokenFirebase = async () => {
    let currentToken = "";

    try {
        currentToken = await getToken(messaging, {
            vapidKey: CLOUD_MESSAGING_TOKEN,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log("An error occurred while retrieving token. ", error);
    }

    return currentToken;
};

export const onMessageListener = () =>
    new Promise<MessagePayload>((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
export default app;
