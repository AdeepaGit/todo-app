
import axios from "axios";

export const getApiErrorMessage = (
    error: unknown,
    fallbackMessage: string
): string => {
    if (axios.isAxiosError(error)) {
        // Backend returned an error response
        if (error.response) {
            const message = error.response.data?.message;

            if (typeof message === "string") {
                return message;
            }

            return fallbackMessage;
        }

        // Request was sent but no response received
        if (error.request) {
            return "Unable to connect to the server. Please check your connection.";
        }
    }

    return fallbackMessage;
};
