"use client";

import { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Printer, Sparkles, Loader2, Undo, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeSession } from "@/hooks/useResumeSession";
import { ResumeData } from "@/types/resume";

import { CapybaraClassic } from "@/components/templates/CapybaraClassic";
import { BambooModern } from "@/components/templates/BambooModern";
import { RiverFlow } from "@/components/templates/RiverFlow";
import { CanopyBold } from "@/components/templates/CanopyBold";
import { GenerativeResume } from "@/components/templates/GenerativeResume";

function ScaledContent({ children, scale }: { children: React.ReactNode, scale: number }) {
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setHeight(entries[0].contentRect.height);
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div style={{ height: height * scale }} className="relative w-full print:!h-auto print:!w-full overflow-hidden print:!overflow-visible">
      <div 
        ref={contentRef}
        style={{ 
          width: '800px', 
          transform: `scale(${scale})`, 
          transformOrigin: 'top left'
        }}
        className="absolute top-0 left-0 bg-white shadow-2xl rounded-sm border border-border/50 print:static print:!scale-100 print:!w-full print:border-none print:shadow-none"
      >
        {children}
      </div>
    </div>
  );
}

const bulletPointSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  originalText: z.string().optional(),
});

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
  summaryOriginalText: z.string().optional(),
  experience: z.array(z.object({
    id: z.string(),
    role: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    bulletPoints: z.array(bulletPointSchema),
  })),
  education: z.array(z.object({
    id: z.string(),
    degree: z.string(),
    institution: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    bulletPoints: z.array(bulletPointSchema),
  })),
  skills: z.string(), // Comma separated
});

type FormValues = z.infer<typeof formSchema>;

import { Control, UseFormRegister } from "react-hook-form";

interface BulletListProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  isEnhancing: string | null;
}

interface ExperienceBulletListProps extends Omit<BulletListProps, 'handleMagicEnhance' | 'handleUndo'> {
  expIndex: number;
  handleMagicEnhance: (section: "experience", expIndex: number, bulletIndex: number, style: string) => Promise<void>;
  handleUndo: (section: "experience", expIndex: number, bulletIndex: number) => void;
}

interface EducationBulletListProps extends Omit<BulletListProps, 'handleMagicEnhance' | 'handleUndo'> {
  eduIndex: number;
  handleMagicEnhance: (section: "education", eduIndex: number, bulletIndex: number, style: string) => Promise<void>;
  handleUndo: (section: "education", eduIndex: number, bulletIndex: number) => void;
}

// Components for nested arrays
function ExperienceBulletList({ control, register, expIndex, isEnhancing, handleMagicEnhance, handleUndo }: ExperienceBulletListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `experience.${expIndex}.bulletPoints`,
  });

  return (
    <div className="md:col-span-2 space-y-4">
      <Label>Description / Responsibilities</Label>
      <div className="space-y-3">
        {fields.map((field, bulletIndex) => {
          const enhanceKey = `experience-${expIndex}-${bulletIndex}`;
          return (
            <div key={field.id} className="relative flex flex-col gap-2 p-3 border rounded-md bg-background">
              <div className="flex justify-between items-center mb-1">
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleMagicEnhance("experience", expIndex, bulletIndex, "metric")} disabled={isEnhancing === enhanceKey}>
                    {isEnhancing === enhanceKey ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />} Metric
                  </Button>
                  <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleMagicEnhance("experience", expIndex, bulletIndex, "leadership")} disabled={isEnhancing === enhanceKey}>
                    {isEnhancing === enhanceKey ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1 text-purple-500" />} Leadership
                  </Button>
                  <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleMagicEnhance("experience", expIndex, bulletIndex, "simple")} disabled={isEnhancing === enhanceKey}>
                    {isEnhancing === enhanceKey ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1 text-blue-500" />} Simple
                  </Button>
                  {control._formValues.experience[expIndex]?.bulletPoints[bulletIndex]?.originalText && (
                    <Button type="button" variant="secondary" size="sm" className="h-7 text-xs" onClick={() => handleUndo("experience", expIndex, bulletIndex)}>
                      <Undo className="w-3 h-3 mr-1" /> Undo
                    </Button>
                  )}
                </div>
                <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive" onClick={() => remove(bulletIndex)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                {...register(`experience.${expIndex}.bulletPoints.${bulletIndex}.text` as const)}
                placeholder="Describe your achievement..."
                className="min-h-[60px]"
                disabled={isEnhancing === enhanceKey}
              />
            </div>
          );
        })}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => append({ text: "" })}>
        <Plus className="w-4 h-4 mr-2" /> Add Bullet Point
      </Button>
    </div>
  );
}

function EducationBulletList({ control, register, eduIndex, isEnhancing, handleMagicEnhance, handleUndo }: EducationBulletListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `education.${eduIndex}.bulletPoints`,
  });

  return (
    <div className="md:col-span-2 space-y-4">
      <Label>Description / Key Achievements</Label>
      <div className="space-y-3">
        {fields.map((field, bulletIndex) => {
          const enhanceKey = `education-${eduIndex}-${bulletIndex}`;
          return (
            <div key={field.id} className="relative flex flex-col gap-2 p-3 border rounded-md bg-background">
              <div className="flex justify-between items-center mb-1">
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleMagicEnhance("education", eduIndex, bulletIndex, "metric")} disabled={isEnhancing === enhanceKey}>
                    {isEnhancing === enhanceKey ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />} Metric
                  </Button>
                  <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleMagicEnhance("education", eduIndex, bulletIndex, "leadership")} disabled={isEnhancing === enhanceKey}>
                    {isEnhancing === enhanceKey ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1 text-purple-500" />} Leadership
                  </Button>
                  <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleMagicEnhance("education", eduIndex, bulletIndex, "simple")} disabled={isEnhancing === enhanceKey}>
                    {isEnhancing === enhanceKey ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1 text-blue-500" />} Simple
                  </Button>
                  {control._formValues.education[eduIndex]?.bulletPoints[bulletIndex]?.originalText && (
                    <Button type="button" variant="secondary" size="sm" className="h-7 text-xs" onClick={() => handleUndo("education", eduIndex, bulletIndex)}>
                      <Undo className="w-3 h-3 mr-1" /> Undo
                    </Button>
                  )}
                </div>
                <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive" onClick={() => remove(bulletIndex)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                {...register(`education.${eduIndex}.bulletPoints.${bulletIndex}.text` as const)}
                placeholder="Describe your achievement..."
                className="min-h-[60px]"
                disabled={isEnhancing === enhanceKey}
              />
            </div>
          );
        })}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => append({ text: "" })}>
        <Plus className="w-4 h-4 mr-2" /> Add Bullet Point
      </Button>
    </div>
  );
}


export default function ManualFormPage() {
  const { data: sessionData, updateData, isLoaded } = useResumeSession();
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);
  const [isMatchingLayout, setIsMatchingLayout] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [scale, setScale] = useState(1);
  const previewWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const availableWidth = entry.contentRect.width - 32; // 16px padding on sides
        setScale(Math.min(1, availableWidth / 800));
      }
    });
    if (previewWrapperRef.current) {
      observer.observe(previewWrapperRef.current);
    }
    return () => observer.disconnect();
  }, [isLoaded]);

  const handleMatchLayout = async () => {
    const role = form.getValues("personalInfo.role");
    const summary = form.getValues("summary");
    
    if (!role || !role.trim()) {
      alert("Please enter a Target Role first.");
      return;
    }

    setIsMatchingLayout(true);
    try {
      const response = await fetch('/api/matchmaker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole: role, summary }),
      });

      if (!response.ok) {
        throw new Error('Failed to match layout');
      }

      const data = await response.json();
      if (data.templateId) {
        updateData({ 
          templateId: data.templateId,
          theme: data.theme,
          layout: data.layout
        });
        alert(`✨ Layout updated!\n\nReason: ${data.reason}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to auto-match layout. Please try again.');
    } finally {
      setIsMatchingLayout(false);
    }
  };

  const handleMagicEnhance = async (section: "experience" | "education", expIndex: number, bulletIndex: number, style: string) => {
    const itemData = form.getValues(`${section}.${expIndex}` as const);
    const bullet = form.getValues(`${section}.${expIndex}.bulletPoints.${bulletIndex}` as const);
    if (!bullet || !bullet.text.trim()) return;

    const enhanceKey = `${section}-${expIndex}-${bulletIndex}`;
    setIsEnhancing(enhanceKey);
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: bullet.text,
          role: 'role' in itemData ? itemData.role : itemData.degree,
          company: 'company' in itemData ? itemData.company : itemData.institution,
          style: style,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to enhance text');
      }

      const data = await response.json();
      if (data.enhancedText) {
        const existingOriginalText = form.getValues(`${section}.${expIndex}.bulletPoints.${bulletIndex}.originalText` as const);
        if (!existingOriginalText) {
          form.setValue(`${section}.${expIndex}.bulletPoints.${bulletIndex}.originalText` as const, bullet.text);
        }
        form.setValue(`${section}.${expIndex}.bulletPoints.${bulletIndex}.text` as const, data.enhancedText, { shouldDirty: true, shouldTouch: true });
      }
    } catch (error) {
      console.error(error);
      alert('Failed to enhance bullet point. Please try again.');
    } finally {
      setIsEnhancing(null);
    }
  };

  const handleUndo = (section: "experience" | "education", expIndex: number, bulletIndex: number) => {
    const originalText = form.getValues(`${section}.${expIndex}.bulletPoints.${bulletIndex}.originalText` as const);
    if (originalText) {
      form.setValue(`${section}.${expIndex}.bulletPoints.${bulletIndex}.text` as const, originalText, { shouldDirty: true });
      form.setValue(`${section}.${expIndex}.bulletPoints.${bulletIndex}.originalText` as const, "");
    }
  };

  const handleSummaryEnhance = async (style: string) => {
    const text = form.getValues("summary");
    const role = form.getValues("personalInfo.role");
    if (!text || !text.trim()) return;

    setIsEnhancing("summary");
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          role: role,
          style: style,
          type: "summary",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to enhance summary');
      }

      const data = await response.json();
      if (data.enhancedText) {
        const existingOriginalText = form.getValues("summaryOriginalText");
        if (!existingOriginalText) {
          form.setValue("summaryOriginalText", text);
        }
        form.setValue("summary", data.enhancedText, { shouldDirty: true, shouldTouch: true });
      }
    } catch (error) {
      console.error(error);
      alert('Failed to enhance summary. Please try again.');
    } finally {
      setIsEnhancing(null);
    }
  };

  const handleSummaryUndo = () => {
    const originalText = form.getValues("summaryOriginalText");
    if (originalText) {
      form.setValue("summary", originalText, { shouldDirty: true });
      form.setValue("summaryOriginalText", "");
    }
  };

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
      summaryOriginalText: "",
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
      const searchParams = new URLSearchParams(window.location.search);
      const urlTemplate = searchParams.get("template");
      if (urlTemplate && ["generative", "capybara-classic", "bamboo-modern", "river-flow", "canopy-bold"].includes(urlTemplate)) {
        if (sessionData.templateId !== urlTemplate) {
          updateData({ templateId: urlTemplate });
        }
      }

      reset({
        personalInfo: sessionData.personalInfo,
        summary: sessionData.summary || "",
        experience: sessionData.experience.map(e => ({
          ...e,
          bulletPoints: e.description.map(d => ({ text: d }))
        })) || [],
        education: sessionData.education.map(e => ({
          ...e,
          bulletPoints: e.description.map(d => ({ text: d }))
        })) || [],
        skills: sessionData.skills.join(", ") || "",
      });
    }
  }, [isLoaded, sessionData, reset]);

  // Derive preview data from live form state
  // Derive preview data from live form state
  const livePreviewData: ResumeData = {
    ...sessionData,
    personalInfo: {
      firstName: formValues.personalInfo?.firstName ?? sessionData.personalInfo.firstName,
      lastName: formValues.personalInfo?.lastName ?? sessionData.personalInfo.lastName,
      email: formValues.personalInfo?.email ?? sessionData.personalInfo.email,
      phone: formValues.personalInfo?.phone ?? sessionData.personalInfo.phone,
      location: formValues.personalInfo?.location ?? sessionData.personalInfo.location,
      linkedin: formValues.personalInfo?.linkedin ?? sessionData.personalInfo.linkedin,
      website: formValues.personalInfo?.website ?? sessionData.personalInfo.website,
      role: formValues.personalInfo?.role ?? sessionData.personalInfo.role,
    },
    summary: formValues.summary ?? "",
    experience: (formValues.experience || []).map((e, i) => ({
      id: e?.id ?? `exp-${i}`,
      role: e?.role ?? "",
      company: e?.company ?? "",
      location: e?.location ?? "",
      startDate: e?.startDate ?? "",
      endDate: e?.endDate ?? "",
      description: e?.bulletPoints ? e.bulletPoints.map((b) => b?.text ?? "").filter((d) => d.trim() !== "") : [],
    })),
    education: (formValues.education || []).map((e, i) => ({
      id: e?.id ?? `edu-${i}`,
      degree: e?.degree ?? "",
      institution: e?.institution ?? "",
      location: e?.location ?? "",
      startDate: e?.startDate ?? "",
      endDate: e?.endDate ?? "",
      description: e?.bulletPoints ? e.bulletPoints.map((b) => b?.text ?? "").filter((d) => d.trim() !== "") : [],
    })),
    skills: formValues.skills ? formValues.skills.split(",").map((s) => s.trim()).filter((s) => s !== "") : [],
    theme: sessionData.theme,
    layout: sessionData.layout,
  };

  const onSubmit = (values: FormValues) => {
    // Transform data back to ResumeData shape
    const finalData: ResumeData = {
      personalInfo: values.personalInfo,
      summary: values.summary,
      experience: values.experience.map(e => ({
        ...e,
        id: e.id || Date.now().toString(),
        description: e.bulletPoints.map(b => b.text).filter(d => d.trim() !== "")
      })),
      education: values.education.map(e => ({
        ...e,
        id: e.id || Date.now().toString(),
        description: e.bulletPoints.map(b => b.text).filter(d => d.trim() !== "")
      })),
      skills: values.skills.split(",").map(s => s.trim()).filter(s => s !== ""),
    };

    updateData(finalData);
    window.print();
  };

  const renderTemplate = () => {
    switch (sessionData.templateId) {
      case "generative":
        return <GenerativeResume data={livePreviewData} />;
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
      <div className={`w-full lg:w-1/2 p-4 md:p-8 overflow-y-auto print:hidden ${showMobilePreview ? 'hidden lg:block' : 'block'}`}>
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
                  <div className="flex justify-between items-center">
                    <Label>Target Role</Label>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs text-blue-500 hover:text-blue-600 px-2"
                      onClick={handleMatchLayout}
                      disabled={isMatchingLayout}
                    >
                      {isMatchingLayout ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />} Auto-Match
                    </Button>
                  </div>
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
                <div className="space-y-2">
                  <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2 mb-2">
                    <Label>Brief overview of your career and skills</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleSummaryEnhance("metric")} disabled={isEnhancing === "summary"}>
                        {isEnhancing === "summary" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />} Metric
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleSummaryEnhance("leadership")} disabled={isEnhancing === "summary"}>
                        {isEnhancing === "summary" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1 text-purple-500" />} Leadership
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleSummaryEnhance("simple")} disabled={isEnhancing === "summary"}>
                        {isEnhancing === "summary" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1 text-blue-500" />} Simple
                      </Button>
                      {formValues.summaryOriginalText && (
                        <Button type="button" variant="secondary" size="sm" className="h-7 text-xs" onClick={handleSummaryUndo}>
                          <Undo className="w-3 h-3 mr-1" /> Undo
                        </Button>
                      )}
                    </div>
                  </div>
                  <Textarea
                    {...register("summary")}
                    placeholder="A brief overview of your career and skills..."
                    className="min-h-[100px]"
                    disabled={isEnhancing === "summary"}
                  />
                </div>
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
                  onClick={() => appendExp({ id: "", role: "", company: "", location: "", startDate: "", endDate: "", bulletPoints: [{ text: "" }] })}
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
                      <ExperienceBulletList
                        control={control}
                        register={register}
                        expIndex={index}
                        isEnhancing={isEnhancing}
                        handleMagicEnhance={handleMagicEnhance}
                        handleUndo={handleUndo}
                      />
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
                  onClick={() => appendEdu({ id: "", degree: "", institution: "", location: "", startDate: "", endDate: "", bulletPoints: [{ text: "" }] })}
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
                      <EducationBulletList
                        control={control}
                        register={register}
                        eduIndex={index}
                        isEnhancing={isEnhancing}
                        handleMagicEnhance={handleMagicEnhance}
                        handleUndo={handleUndo}
                      />
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
              <Button type="button" size="lg" className="w-full h-14 px-8 text-lg font-bold rounded-full" onClick={() => setShowMobilePreview(true)}>
                Preview CV <Eye className="ml-2" />
              </Button>
            </div>
            
          </form>
        </div>
      </div>

      {/* Right Pane - Live Preview (Printed content) */}
      <div className={`w-full lg:w-1/2 bg-secondary/30 relative flex-col lg:h-screen lg:sticky lg:top-0 print:w-full print:bg-white print:h-auto print:static ${showMobilePreview ? 'flex' : 'hidden lg:flex'}`}>
        
        {/* Template Selector Top Bar - Hidden on print */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10 print:hidden bg-background/80 backdrop-blur-md border-b flex justify-between items-center overflow-x-auto">
          <div className="flex gap-2 min-w-max pr-4 items-center">
            <Button variant="ghost" size="sm" className="lg:hidden mr-2" onClick={() => setShowMobilePreview(false)}>
              ← Back
            </Button>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleMatchLayout}
              disabled={isMatchingLayout}
              className="rounded-full px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
            >
              {isMatchingLayout ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />} 
              AI Matchmaker
            </Button>
            <div className="h-4 w-px bg-border mx-1"></div>
            {["generative", "capybara-classic", "bamboo-modern", "river-flow", "canopy-bold"].map((id) => (
              <Button
                key={id}
                variant={sessionData.templateId === id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => updateData({ templateId: id })}
                className="capitalize text-xs rounded-full px-3"
              >
                {id.split("-").join(" ")}
              </Button>
            ))}
          </div>
          <Button form="cv-form" type="submit" className="flex rounded-full shrink-0" size="sm">
            <Printer className="w-4 h-4 mr-2 hidden sm:block" />
            Download
          </Button>
        </div>
        
        {/* Preview Container */}
        <div ref={previewWrapperRef} className="flex-1 overflow-y-auto p-4 pt-20 lg:p-6 lg:pt-24 print:p-0 print:overflow-visible flex flex-col items-center">
          <div className="print:w-full" style={{ width: 800 * scale }}>
            <ScaledContent scale={scale}>
              {renderTemplate()}
            </ScaledContent>
          </div>
        </div>
      </div>
    </div>
  );
}
