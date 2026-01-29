import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import type { Click } from "@shared/schema";
import { CheckCircle2 } from "lucide-react";

interface LatestStatusProps {
  latestClick?: Click;
  isLoading: boolean;
}

export function LatestStatus({ latestClick, isLoading }: LatestStatusProps) {
  if (!latestClick && !isLoading) {
    return (
      <div className="bg-card rounded-2xl p-8 text-center border border-border/50 shadow-sm h-full flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <div className="w-3 h-3 bg-muted-foreground/30 rounded-full" />
        </div>
        <h2 className="text-xl font-medium text-muted-foreground">Ready to start tracking</h2>
        <p className="text-sm text-muted-foreground/60 mt-2">Press any button to register an event</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border border-border/50 shadow-sm h-full min-h-[200px] flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <AnimatePresence mode="wait">
          {latestClick && (
            <motion.div
              key={latestClick.id} // Animate when ID changes
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 ring-8 ring-green-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Latest Entry
                </h3>
                
                <div className="text-4xl md:text-5xl font-bold text-foreground font-mono tracking-tighter">
                  #{latestClick.dailySequence}
                </div>
                
                <p className="text-lg font-medium text-primary pt-2">
                  Recorded today at <span className="text-foreground">{format(new Date(latestClick.createdAt), "HH:mm")}</span>
                </p>
                
                <div className="inline-block mt-4 px-3 py-1 rounded-full bg-muted text-xs font-mono text-muted-foreground">
                  {format(new Date(latestClick.createdAt), "dd/MM/yyyy")} • {latestClick.buttonId}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
