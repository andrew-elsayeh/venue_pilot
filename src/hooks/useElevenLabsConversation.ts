
import { useState, useEffect, useCallback } from 'react';
import { useConversation } from '@11labs/react';

// Define the booking information structure
interface BookingInfo {
  eventName: string;
  budget: string;
  location: string;
  attendees: string;
  dateTime: string;
}

interface UseElevenLabsConversationProps {
  agentId?: string;
}

// Define the message interface based on actual ElevenLabs API
interface ConversationMessage {
  message: string;
  source: 'assistant' | 'user' | string;
}

export const useElevenLabsConversation = ({ agentId }: UseElevenLabsConversationProps = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    eventName: '',
    budget: '',
    location: '',
    attendees: '',
    dateTime: '',
  });
  const [isReady, setIsReady] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Define client tools to update booking information
  const updateBookingInfoField = useCallback((field: keyof BookingInfo, value: string) => {
    setBookingInfo(prev => ({ ...prev, [field]: value }));
    return `Updated ${field} to ${value}`;
  }, []);

  // Initialize the conversation hook with the client tools for the agent to use
  const conversation = useConversation({
    clientTools: {
      updateEventName: (params: { eventName: string }) => 
        updateBookingInfoField('eventName', params.eventName),
      updateBudget: (params: { budget: string }) => 
        updateBookingInfoField('budget', params.budget),
      updateLocation: (params: { location: string }) => 
        updateBookingInfoField('location', params.location),
      updateAttendees: (params: { attendees: string }) => 
        updateBookingInfoField('attendees', params.attendees),
      updateDateTime: (params: { dateTime: string }) => 
        updateBookingInfoField('dateTime', params.dateTime),
    },
    onMessage: (message: ConversationMessage) => {
      // Update transcript with agent messages and user speech
      // Handle the message structure correctly
      if (message.source === 'assistant' || message.source === 'user') {
        setTranscript(prev => `${prev ? prev + '\n' : ''}${message.source}: ${message.message}`);
      }
    },
    onError: (message: string) => {
      setError(`Error: ${message}`);
      setIsListening(false);
    },
    onConnect: () => {
      setIsReady(true);
      setError(null);
    },
    onDisconnect: () => {
      setIsListening(false);
    },
    overrides: {
      // agent: {
      //   prompt: {
      //     prompt: `You are a helpful venue booking assistant. Help the user book a venue for their event.
      //       Ask about their event name, budget, location preference, number of attendees, and preferred date/time.
      //       After collecting this information, use the client tools to save each piece of information.
      //       Be conversational and helpful.`
      //   },
      //   firstMessage: "Hi there! I'm your venue booking assistant. I can help you book the perfect venue for your event. What kind of event are you planning?",
      //   language: "en",
      // }
    }
  });

  // Methods to control the conversation
  const startConversation = async () => {
    if (!isReady) {
      setError("Conversation agent is not ready");
      return;
    }
    
    try {
      setIsListening(true);
      // Start a conversation with the ElevenLabs agent using the provided agent ID
      await conversation.startSession({
        agentId: agentId || "F3WlJYKgyAoLWpo9V1Cw" // Use the provided agent ID or fallback to hardcoded
      //   dynamicVariables: {
      //     budget: '',
      //     eventName: ''
      // },
      });
      console.log("Starting conversation with ElevenLabs...");
    } catch (err) {
      setError(`Failed to start conversation: ${err instanceof Error ? err.message : String(err)}`);
      setIsListening(false);
    }
  };

  const stopConversation = async () => {
    try {
      await conversation.endSession();
      setIsListening(false);
      console.log("Stopping conversation with ElevenLabs...");
    } catch (err) {
      setError(`Failed to stop conversation: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const toggleConversation = () => {
    if (isListening) {
      stopConversation();
    } else {
      startConversation();
    }
  };

  // Update booking info from any component
  const updateBookingInfo = (newInfo: Partial<BookingInfo>) => {
    setBookingInfo(prev => ({ ...prev, ...newInfo }));
  };

  return {
    isListening,
    transcript,
    bookingInfo,
    isReady,
    error,
    startConversation,
    stopConversation,
    toggleConversation,
    updateBookingInfo,
  };
};
