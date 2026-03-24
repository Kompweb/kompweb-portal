import { ProjectStatus } from "@workspace/api-client-react";
import { CheckCircle2, Clock, PlayCircle, AlertCircle, XCircle, FileSearch } from "lucide-react";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config: Record<ProjectStatus, { label: string; color: string; icon: any }> = {
    [ProjectStatus.submitted]: { 
      label: "Submitted", 
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: FileSearch 
    },
    [ProjectStatus.in_review]: { 
      label: "In Review", 
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: Clock 
    },
    [ProjectStatus.in_progress]: { 
      label: "In Progress", 
      color: "bg-amber-100 text-amber-700 border-amber-200",
      icon: PlayCircle 
    },
    [ProjectStatus.needs_feedback]: { 
      label: "Needs Feedback", 
      color: "bg-rose-100 text-rose-700 border-rose-200",
      icon: AlertCircle 
    },
    [ProjectStatus.delivered]: { 
      label: "Delivered", 
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      icon: CheckCircle2 
    },
    [ProjectStatus.cancelled]: { 
      label: "Cancelled", 
      color: "bg-slate-100 text-slate-700 border-slate-200",
      icon: XCircle 
    },
  };

  const { label, color, icon: Icon } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${color} ${className}`}>
      <Icon size={14} />
      {label}
    </span>
  );
}
