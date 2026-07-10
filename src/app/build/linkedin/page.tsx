"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeSession } from "@/hooks/useResumeSession";
import { ResumeData } from "@/types/resume";

export default function LinkedInUploadPage() {
  const router = useRouter();
  const { data: sessionData, updateData } = useResumeSession();

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setError(null);
      } else {
        setError("Please upload a valid PDF file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("background", sessionData?.personalInfo?.role || "Professional");

    try {
      const response = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process PDF.");
      }

      const parsedData: ResumeData = await response.json();
      updateData(parsedData);

      // Route to form on success
      router.push("/build/form");
    } catch (err: unknown) {
      setError((err as Error).message || "An unexpected error occurred.");
      setIsUploading(false);
    }
  };

  if (isUploading) {
    return (
      <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mt-20 animate-in fade-in duration-700">
        <div className="relative w-48 h-48 mb-8 animate-pulse">
          <Image src="/assets/mascot/thinking.png" alt="Capy Thinking" fill className="object-contain" />
        </div>
        <h2 className="text-3xl font-heading font-black mb-4">Capy is reading your profile...</h2>
        <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
          Our AI is intelligently structuring your experience and enhancing your bullet points. This usually takes about 10-20 seconds.
        </p>
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Upload LinkedIn Profile</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Export your LinkedIn profile to a PDF and upload it here. We&apos;ll use AI to automatically generate a beautiful, tailored resume for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Upload Zone */}
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border/60 bg-secondary/10"
          } ${file ? "bg-green-50/10 border-green-500/50" : "hover:bg-secondary/20 hover:border-primary/50"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />

          {file ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                <FileText size={32} />
              </div>
              <p className="font-bold text-lg text-foreground mb-1">{file.name}</p>
              <p className="text-sm text-muted-foreground mb-6">
                {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to process
              </p>
              <Button onClick={(e) => { e.stopPropagation(); handleUpload(); }} size="lg" className="h-12 px-8 font-bold rounded-full w-full">
                Generate CV
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center cursor-pointer">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <UploadCloud size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Drag & Drop your PDF</h3>
              <p className="text-muted-foreground mb-6">or click to browse files</p>
              <Button variant="outline" className="rounded-full">Browse Files</Button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-secondary/30 rounded-2xl p-8 border border-border/50">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <CheckCircle className="text-primary mr-2" size={24} />
            How to get your PDF
          </h3>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center font-bold">1</div>
              <div>
                <p className="font-semibold">Go to your LinkedIn Profile</p>
                <p className="text-sm text-muted-foreground">Navigate to your own profile page on LinkedIn.com</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center font-bold">2</div>
              <div>
                <p className="font-semibold">Click &quot;More&quot;</p>
                <p className="text-sm text-muted-foreground">Look for the &quot;More&quot; button near your profile picture.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center font-bold">3</div>
              <div>
                <p className="font-semibold">Save to PDF</p>
                <p className="text-sm text-muted-foreground">Select &quot;Save to PDF&quot; from the dropdown menu.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl flex items-start gap-3">
          <AlertCircle className="mt-0.5 shrink-0" size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
