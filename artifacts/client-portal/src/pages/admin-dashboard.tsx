import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useListProjects, ProjectStatus, Project } from "@workspace/api-client-react";
import { format } from "date-fns";
import {
  BarChart3, Clock, CheckCircle2, AlertCircle,
  Search, SlidersHorizontal, Loader2, Edit3, LogOut,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getAdminKey, clearAdminSession } from "@/components/require-admin";

/* ── helpers ── */
function adminHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "X-Admin-Key": getAdminKey(),
  };
}

/* ── custom hooks ── */
function useAdminStats() {
  return useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats", { headers: adminHeaders() });
      if (!res.ok) throw new Error("Failed to load stats");
      return res.json() as Promise<{
        totalProjects: number;
        byStatus: Record<string, number>;
        recentProjects: Project[];
      }>;
    },
  });
}

function useAdminUpdateProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: number; status: string; adminNotes: string }) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: adminHeaders(),
        body: JSON.stringify({ status, adminNotes }),
      });
      if (!res.ok) throw new Error("Failed to update project");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Project updated" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: () => {
      toast({ title: "Failed to update project", variant: "destructive" });
    },
  });
}

/* ── component ── */
export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { toast } = useToast();

  const { data: stats, isLoading: statsLoading } = useAdminStats();

  const statusFilter =
    activeTab === "all" ? undefined :
    activeTab === "active" ? ProjectStatus.in_progress :
    activeTab === "review" ? ProjectStatus.in_review :
    activeTab === "completed" ? ProjectStatus.delivered : undefined;

  const { data: projects, isLoading: projectsLoading } = useListProjects({ status: statusFilter });

  const { mutate: updateProject, isPending: isUpdating } = useAdminUpdateProject();

  const filteredProjects = projects?.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingProject) return;
    const fd = new FormData(e.currentTarget);
    updateProject({
      id: editingProject.id,
      status: fd.get("status") as string,
      adminNotes: fd.get("adminNotes") as string,
    }, {
      onSuccess: () => setEditingProject(null),
    });
  }

  function handleLogout() {
    clearAdminSession();
    window.location.reload();
  }

  return (
    <div className="flex-1 bg-muted/30 py-8">
      <div className="container mx-auto px-4 space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Manage all client projects and track progress.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <h3 className="text-2xl font-bold">{statsLoading ? "-" : stats?.totalProjects}</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <h3 className="text-2xl font-bold">
                  {statsLoading ? "-" : stats?.byStatus?.[ProjectStatus.in_progress] || 0}
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Needs Feedback</p>
                <h3 className="text-2xl font-bold">
                  {statsLoading ? "-" : stats?.byStatus?.[ProjectStatus.needs_feedback] || 0}
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold">
                  {statsLoading ? "-" : stats?.byStatus?.[ProjectStatus.delivered] || 0}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main List */}
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader className="border-b px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 space-y-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="bg-muted">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects…"
                className="pl-9 h-9 rounded-full bg-muted/50 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {projectsLoading ? (
              <div className="p-12 flex justify-center text-primary">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : filteredProjects?.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <SlidersHorizontal className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No projects found matching your criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b">
                    <tr>
                      <th className="px-6 py-4 font-medium">Project</th>
                      <th className="px-6 py-4 font-medium">Client</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Created</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {filteredProjects?.map((project) => (
                      <tr key={project.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4 font-medium text-foreground">
                          <span className="block truncate max-w-[200px]" title={project.title}>
                            {project.title}
                          </span>
                          <span className="text-xs text-muted-foreground font-mono mt-0.5 block">
                            ID: {project.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{project.clientName}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {project.projectType.replace("_", " ")}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={project.status} />
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {format(new Date(project.createdAt), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setEditingProject(project)}
                          >
                            <Edit3 className="w-4 h-4 mr-2" /> Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <form onSubmit={handleSaveEdit}>
            <DialogHeader>
              <DialogTitle className="font-display">Update Project Status</DialogTitle>
              <DialogDescription>
                Update the progress or leave notes for {editingProject?.clientName}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingProject?.status} name="status">
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ProjectStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Admin Notes (Visible to client)</Label>
                <Textarea
                  name="adminNotes"
                  defaultValue={editingProject?.adminNotes || ""}
                  className="rounded-xl min-h-[100px]"
                  placeholder="E.g., We're waiting on the final logo assets before we can proceed…"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingProject(null)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating} className="rounded-xl">
                {isUpdating ? "Saving…" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
