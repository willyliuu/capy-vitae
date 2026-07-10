"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeSession } from "@/hooks/useResumeSession";
import { ResumeData } from "@/types/resume";

// Templates
import { CapybaraClassic } from "@/components/templates/CapybaraClassic";
import { BambooModern } from "@/components/templates/BambooModern";
import { RiverFlow } from "@/components/templates/RiverFlow";
import { CanopyBold } from "@/components/templates/CanopyBold";

const formSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string(),
    website: z.string(),
    role: z.string(),
  }),
  summary: z.string(),
  experience: z.array(z.object({
    id: z.string(),
    role: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(), // We'll split this by newline to make the array later
  })),
  education: z.array(z.object({
    id: z.string(),
    degree: z.string(),
    institution: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
  })),
  skills: z.string(), // Comma separated
});

type FormValues = z.infer<typeof formSchema>;

export default function ManualFormPage() {
  const { data: sessionData, updateData, isLoaded } = useResumeSession();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        role: "",
      },
      summary: "",
      experience: [],
      education: [],
      skills: "",
    },
  });

  const { register, control, handleSubmit, reset } = form;
  const formValues = useWatch({ control });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: "experience",
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    if (isLoaded && sessionData) {
      reset({
        personalInfo: sessionData.personalInfo,
        summary: sessionData.summary || "",
        experience: sessionData.experience.map(e => ({ ...e, description: e.description.join("\n") })) || [],
        education: sessionData.education.map(e => ({ ...e, description: e.description.join("\n") })) || [],
        skills: sessionData.skills.join(", ") || "",
      });
    }
  }, [isLoaded, sessionData, reset]);

  // Derive preview data from live form state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const livePreviewData: ResumeData = {
    ...sessionData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    personalInfo: (formValues.personalInfo as any) || sessionData.personalInfo,
    summary: formValues.summary || "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    experience: (formValues.experience || []).map((e: any, i) => ({
      ...e,
      id: e.id || `exp-${i}`,
      description: e.description ? e.description.split("\n").filter((d: string) => d.trim() !== "") : [],
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    education: (formValues.education || []).map((e: any, i) => ({
      ...e,
      id: e.id || `edu-${i}`,
      description: e.description ? e.description.split("\n").filter((d: string) => d.trim() !== "") : [],
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skills: formValues.skills ? formValues.skills.split(",").map((s: string) => s.trim()).filter((s: string) => s !== "") : [],
  };

  const onSubmit = (values: FormValues) => {
    // Transform data back to ResumeData shape
    const finalData: ResumeData = {
      personalInfo: values.personalInfo,
      summary: values.summary,
      experience: values.experience.map(e => ({
        ...e,
        id: e.id || Date.now().toString(),
        description: e.description.split("\n").filter(d => d.trim() !== "")
      })),
      education: values.education.map(e => ({
        ...e,
        id: e.id || Date.now().toString(),
        description: e.description.split("\n").filter(d => d.trim() !== "")
      })),
      skills: values.skills.split(",").map(s => s.trim()).filter(s => s !== ""),
    };

    updateData(finalData);
    window.print();
  };

  const renderTemplate = () => {
    switch (sessionData.templateId) {
      case "bamboo-modern":
        return <BambooModern data={livePreviewData} />;
      case "river-flow":
        return <RiverFlow data={livePreviewData} />;
      case "canopy-bold":
        return <CanopyBold data={livePreviewData} />;
      case "capybara-classic":
      default:
        return <CapybaraClassic data={livePreviewData} />;
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Pane - Form (Hidden on print) */}
      <div className="w-full lg:w-1/2 p-4 md:p-8 overflow-y-auto print:hidden">
        <div className="w-full mx-auto animate-in fade-in duration-500">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">Complete Your CV</h1>
              <p className="text-muted-foreground">Fill in the details below. Watch it update live!</p>
            </div>
            <Button form="cv-form" type="submit" size="sm" className="hidden md:flex lg:hidden">
              <Printer className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          <form id="cv-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Personal Info */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="bg-secondary/20 border-b border-border/50">
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input {...register("personalInfo.firstName")} placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input {...register("personalInfo.lastName")} placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Target Role</Label>
                  <Input {...register("personalInfo.role")} placeholder="Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input {...register("personalInfo.email")} type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input {...register("personalInfo.phone")} placeholder="+1 234 567 890" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input {...register("personalInfo.location")} placeholder="New York, NY" />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn URL</Label>
                  <Input {...register("personalInfo.linkedin")} placeholder="linkedin.com/in/johndoe" />
                </div>
                <div className="space-y-2">
                  <Label>Website / Portfolio</Label>
                  <Input {...register("personalInfo.website")} placeholder="johndoe.com" />
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="bg-secondary/20 border-b border-border/50">
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Textarea
                  {...register("summary")}
                  placeholder="A brief summary of your professional background and goals..."
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="bg-secondary/20 border-b border-border/50 flex flex-row items-center justify-between">
                <CardTitle>Experience</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendExp({ id: "", role: "", company: "", location: "", startDate: "", endDate: "", description: "" })}
                >
                  <Plus size={16} className="mr-2" /> Add Experience
                </Button>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {expFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg relative space-y-4 bg-muted/20">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                      onClick={() => removeExp(index)}
                    >
                      <Trash2 size={18} />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input {...register(`experience.${index}.role` as const)} placeholder="Senior Developer" />
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input {...register(`experience.${index}.company` as const)} placeholder="Acme Corp" />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input {...register(`experience.${index}.startDate` as const)} placeholder="Jan 2020" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input {...register(`experience.${index}.endDate` as const)} placeholder="Present" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label>Description (one bullet point per line)</Label>
                        <Textarea
                          {...register(`experience.${index}.description` as const)}
                          placeholder="- Led development of..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {expFields.length === 0 && <p className="text-center text-muted-foreground py-4">No experience added yet.</p>}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="bg-secondary/20 border-b border-border/50 flex flex-row items-center justify-between">
                <CardTitle>Education</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendEdu({ id: "", degree: "", institution: "", location: "", startDate: "", endDate: "", description: "" })}
                >
                  <Plus size={16} className="mr-2" /> Add Education
                </Button>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {eduFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg relative space-y-4 bg-muted/20">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                      onClick={() => removeEdu(index)}
                    >
                      <Trash2 size={18} />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <Label>Degree / Program</Label>
                        <Input {...register(`education.${index}.degree` as const)} placeholder="B.S. in Computer Science" />
                      </div>
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input {...register(`education.${index}.institution` as const)} placeholder="State University" />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input {...register(`education.${index}.startDate` as const)} placeholder="Sep 2016" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input {...register(`education.${index}.endDate` as const)} placeholder="May 2020" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label>Description / Key Achievements (one bullet point per line)</Label>
                        <Textarea
                          {...register(`education.${index}.description` as const)}
                          placeholder="- Graduated with honors..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {eduFields.length === 0 && <p className="text-center text-muted-foreground py-4">No education added yet.</p>}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="bg-secondary/20 border-b border-border/50">
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label>Comma separated list</Label>
                  <Textarea
                    {...register("skills")}
                    placeholder="JavaScript, React, Node.js, Project Management"
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="pb-10 lg:hidden">
              <Button form="cv-form" type="submit" size="lg" className="w-full h-14 px-8 text-lg font-bold rounded-full">
                Download PDF <Printer className="ml-2" />
              </Button>
            </div>
            
          </form>
        </div>
      </div>

      {/* Right Pane - Live Preview (Printed content) */}
      <div className="w-full lg:w-1/2 bg-secondary/30 relative flex flex-col lg:h-screen lg:sticky lg:top-0 print:w-full print:bg-white print:h-auto print:static">
        
        {/* Template Selector Top Bar - Hidden on print */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10 print:hidden bg-background/80 backdrop-blur-md border-b flex justify-between items-center overflow-x-auto">
          <div className="flex gap-2 min-w-max pr-4">
            {["capybara-classic", "bamboo-modern", "river-flow", "canopy-bold"].map((id) => (
              <Button
                key={id}
                variant={sessionData.templateId === id ? "default" : "outline"}
                size="sm"
                onClick={() => updateData({ templateId: id })}
                className="capitalize text-xs rounded-full px-4"
              >
                {id.split("-").join(" ")}
              </Button>
            ))}
          </div>
          <Button form="cv-form" type="submit" className="hidden lg:flex rounded-full shrink-0" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
        
        {/* Preview Container */}
        <div className="flex-1 overflow-y-auto p-4 pt-20 lg:p-6 lg:pt-24 print:p-0 print:overflow-visible flex justify-center items-start">
          <div className="w-full max-w-full shadow-2xl bg-white rounded-sm overflow-hidden border border-border/50 print:border-none print:shadow-none print:rounded-none">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
