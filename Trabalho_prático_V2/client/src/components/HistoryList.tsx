import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import type { Click } from "@shared/schema";
import { Clock, Hash } from "lucide-react";

interface HistoryListProps {
  clicks: Click[];
}

export function HistoryList({ clicks }: HistoryListProps) {
  // Sort by date desc (newest first)
  const sortedClicks = [...clicks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border/50 bg-muted/30">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Recent Activity
        </h3>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
        {clicks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No clicks recorded yet. Be the first!
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {sortedClicks.map((click) => (
                <motion.div
                  key={click.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/60 hover:border-border transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getButtonColorClass(click.buttonId)}`} />
                    <span className="font-medium text-foreground">{click.buttonId}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                    <span className="flex items-center gap-1 bg-muted/50 px-2 py-0.5 rounded text-xs">
                      <Hash className="w-3 h-3" />
                      {click.dailySequence}
                    </span>
                    <span>
                      {format(new Date(click.createdAt), "HH:mm:ss")}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function getButtonColorClass(buttonId: string): string {
  switch (buttonId) {
    case "Button 1": return "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]";
    case "Button 2": return "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]";
    case "Button 3": return "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]";
    case "Button 4": return "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]";
    default: return "bg-gray-400";
  }
}
