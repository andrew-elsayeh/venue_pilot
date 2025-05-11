
import React from 'react';
import VoiceButton from './VoiceButton';
import { useElevenLabsConversation } from '@/hooks/useElevenLabsConversation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BookingCardProps {
  agentId: string;
  onBookingInfoUpdate: (bookingInfo: any) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ agentId, onBookingInfoUpdate }) => {
  const { 
    isListening, 
    transcript,
    bookingInfo, 
    isReady, 
    error, 
    toggleConversation,
  } = useElevenLabsConversation({ agentId });
  
  // Update parent component when booking info changes
  React.useEffect(() => {
    onBookingInfoUpdate(bookingInfo);
  }, [bookingInfo, onBookingInfoUpdate]);

  return (
    <Card className="w-full max-w-md overflow-hidden h-[400px] bg-white rounded-3xl shadow-lg">
      <CardHeader className="text-center p-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Let's plan your venue booking together!
        </h2>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between h-[300px]">
        <div className="w-full flex-1 overflow-y-auto mb-4 px-2">
          {isListening ? (
            <div className="text-center text-gray-500 italic p-4">
              I'm listening... speak now!
            </div>
          ) : (
            <div className="text-center text-gray-500 italic p-4">
              Press the button below and start talking to book your venue.
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center w-full mt-auto mb-4">
          <VoiceButton isListening={isListening} onClick={toggleConversation} />
        </div>
        
        <div className="text-center text-xs text-gray-500 w-full">
          {isListening ? (
            <span className="flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Recording...
            </span>
          ) : (
            <span>Tap the button and speak to start booking</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
