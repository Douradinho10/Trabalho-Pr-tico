import { useState } from "react";
import { useClicks, useCreateClick } from "@/hooks/use-clicks";
import { ClickButton } from "@/components/ClickButton";
import { HistoryList } from "@/components/HistoryList";
import { LatestStatus } from "@/components/LatestStatus";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function Home() {
  const { data: clicks = [], isLoading: isLoadingHistory } = useClicks();
  const createClick = useCreateClick();
  const { toast } = useToast();
  
  // Track which specific button is loading
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  const handleButtonClick = async (buttonId: string) => {
    setLoadingButton(buttonId);
    try {
      await createClick.mutateAsync({ buttonId });
      // Toast is optional since we have the large status display, but good for feedback
      toast({
        title: "Event Recorded",
        description: `Successfully registered click for ${buttonId}`,
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register click. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingButton(null);
    }
  };

  // Determine the latest click
  const latestClick = clicks.length > 0 
    ? [...clicks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : undefined;

  const buttons = [
    { id: "01", label: "Button 1", color: "--btn-1" },
    { id: "02", label: "Button 2", color: "--btn-2" },
    { id: "03", label: "Button 3", color: "--btn-3" },
    { id: "04", label: "Button 4", color: "--btn-4" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex items-center gap-3 pb-6 border-b border-border/40">
          <div className="p-2 bg-primary rounded-lg text-primary-foreground">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Event Logger</h1>
            <p className="text-muted-foreground text-sm">Daily sequence tracking system</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Action Area */}
          <div className="lg:col-span-7 space-y-8">
            {/* Button Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {buttons.map((btn) => (
                <ClickButton
                  key={btn.id}
                  id={btn.id}
                  label={btn.label}
                  colorVar={btn.color}
                  isLoading={loadingButton === btn.label}
                  onClick={() => handleButtonClick(btn.label)}
                />
              ))}
            </div>

            {/* Status Display Area (visible on mobile, primary on desktop) */}
            <div className="lg:hidden">
              <LatestStatus 
                latestClick={latestClick} 
                isLoading={isLoadingHistory} 
              />
            </div>
          </div>

          {/* Right Column: Info & History */}
          <div className="lg:col-span-5 space-y-6 flex flex-col">
            
            {/* Status Display Area (Hidden on mobile to avoid duplication, visible desktop) */}
            <div className="hidden lg:block flex-1 min-h-[250px]">
              <LatestStatus 
                latestClick={latestClick} 
                isLoading={isLoadingHistory} 
              />
            </div>

            {/* History List */}
            <div className="flex-1">
              <HistoryList clicks={clicks} />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
