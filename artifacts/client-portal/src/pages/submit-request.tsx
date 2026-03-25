import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProject, ProjectType } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send, User, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  clientName: z.string().min(2, "Name is required"),
  clientEmail: z.string().email("Valid email is required"),
  title: z.string().min(5, "Project title must be at least 5 characters"),
  description: z.string().min(20, "Please provide more details about your project"),
  projectType: z.nativeEnum(ProjectType, { required_error: "Please select a project type" }),
});

type FormValues = z.infer<typeof formSchema>;

interface SessionUser {
  name: string;
  email: string;
}

export function SubmitRequest() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);

  const { mutate: createProject, isPending } = useCreateProject({
    onSuccess: (data) => {
      toast({ title: "Request Submitted!", description: "We've received your project request." });
      setLocation(`/track/${data.id}`);
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to submit request. Please try again." });
    },
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("kw_user");
      if (raw) {
        const user: SessionUser = JSON.parse(raw);
        setSessionUser(user);
        setValue("clientName", user.name);
        setValue("clientEmail", user.email);
      }
    } catch { /* no-op */ }
  }, [setValue]);

  const onSubmit = (data: FormValues) => {
    createProject(data);
  };

  return (
    <div className="flex-1 flex min-h-[calc(100vh-4rem)] bg-[#0a0a0a]">

      {/* Left — form */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-600/8 blur-[90px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-indigo-500/6 blur-[80px] pointer-events-none" />

        <div className="max-w-xl w-full mx-auto relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-5 shadow-lg shadow-violet-500/5">
              <Sparkles size={11} />
              New project request
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight leading-tight">
              <span className="text-white">Start your next</span><br />
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">project.</span>
            </h1>
            <p className="text-white/50 text-sm leading-relaxed">
              Fill out the details below and we'll review it and get back to you shortly.
            </p>
          </div>

          {/* Client identity pill */}
          {sessionUser && (
            <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl border border-violet-500/20 bg-violet-500/5">
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                <User size={14} className="text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{sessionUser.name}</p>
                <p className="text-white/40 text-xs truncate">{sessionUser.email}</p>
              </div>
              <span className="text-white/25 text-[10px] font-medium uppercase tracking-widest shrink-0">Submitting as</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div className="space-y-1.5">
              <Label className="text-white/50 text-xs font-medium uppercase tracking-wider">Project Title</Label>
              <Input
                placeholder="e.g. Acme Corp Rebrand"
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 rounded-xl focus:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                {...register("title")}
              />
              {errors.title && <p className="text-orange-400 text-xs">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-white/50 text-xs font-medium uppercase tracking-wider">Service Type</Label>
              <Select onValueChange={(val) => setValue("projectType", val as ProjectType)}>
                <SelectTrigger className="bg-white border-gray-200 text-gray-900 h-11 rounded-xl focus:border-gray-400 focus:ring-0 [&>span]:text-gray-400">
                  <SelectValue placeholder="Select service..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 text-gray-900">
                  {Object.values(ProjectType).map((type) => (
                    <SelectItem key={type} value={type} className="text-gray-800 focus:bg-gray-100 focus:text-gray-900">
                      {type.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectType && <p className="text-orange-400 text-xs">{errors.projectType.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-white/50 text-xs font-medium uppercase tracking-wider">Project Description</Label>
              <Textarea
                placeholder="Describe your goals, target audience, and any specific requirements..."
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl resize-none min-h-[120px] focus:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                {...register("description")}
              />
              {errors.description && <p className="text-orange-400 text-xs">{errors.description.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-white text-black hover:bg-white/90 font-semibold rounded-xl transition-all text-sm"
            >
              {isPending ? "Submitting…" : <><Send size={14} className="mr-2" /> Submit Request</>}
            </Button>
          </form>
        </div>
      </div>

      {/* Right — branded panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "#000000" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-transparent to-blue-950/20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-violet-600/12 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

        <img
          src="/images/kompweb-logo-full.png"
          alt="Kompweb Studios"
          className="w-64 object-contain relative z-10 mb-10"
        />

        <div className="relative z-10 max-w-xs text-center">
          <p className="text-white/30 text-sm leading-relaxed">
            Once submitted, you'll receive a unique tracking link to upload files, provide feedback, and download deliverables — all in one place.
          </p>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <p className="text-white/15 text-xs tracking-widest uppercase">kompweb.com</p>
        </div>
      </div>
    </div>
  );
}
