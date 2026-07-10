"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Briefcase, GraduationCap, Laptop, Upload, PenLine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useResumeSession } from "@/hooks/useResumeSession";

export default function OnboardingPage() {
  const router = useRouter();
  const { updateData } = useResumeSession();
  const [step, setStep] = useState<"background" | "method">("background");

  const handleSelectBackground = (role: string) => {
    // Initialize session with this role
    updateData({ personalInfo: { firstName: "", lastName: "", email: "", phone: "", location: "", linkedin: "", website: "", role } });
    setStep("method");
  };

  const handleSelectMethod = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto mt-8 px-4 sm:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Capy Mascot Tips */}
      <div className="flex items-start space-x-6 w-full mb-12 bg-secondary/30 p-6 rounded-2xl border border-border/50">
        <div className="w-24 h-24 relative shrink-0">
          <Image src={step === "background" ? "/assets/mascot/thinking.png" : "/assets/mascot/default.png"} alt="Capy" fill className="object-contain" />
        </div>
        <div className="flex-1 mt-2">
          <h2 className="text-xl font-heading font-bold text-foreground mb-1">
            {step === "background" ? "What's your current professional background?" : "How would you like to build your CV?"}
          </h2>
          <p className="text-muted-foreground">
            {step === "background"
              ? "Don't worry, you can always change this later. We just need a starting point to tailor your experience!"
              : "Importing from LinkedIn is the fastest way, but you can always enter your details manually."}
          </p>
        </div>
      </div>

      {/* Step 1: Background Selection */}
      {step === "background" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <Card
            className="cursor-pointer transition-all hover:border-primary hover:bg-primary/5 hover:scale-105"
            onClick={() => handleSelectBackground("Fresh Graduate")}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <GraduationCap size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Fresh Graduate</h3>
              <p className="text-sm text-muted-foreground">Looking for my first full-time role.</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:border-primary hover:bg-primary/5 hover:scale-105"
            onClick={() => handleSelectBackground("Experienced Professional")}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <Briefcase size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Experienced</h3>
              <p className="text-sm text-muted-foreground">I have 2+ years of professional experience.</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:border-primary hover:bg-primary/5 hover:scale-105"
            onClick={() => handleSelectBackground("Freelancer")}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <Laptop size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Freelancer</h3>
              <p className="text-sm text-muted-foreground">Working on various projects & contracts.</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Method Selection */}
      {step === "method" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          <Card
            className="cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-500/5 hover:scale-105 border-2 border-transparent"
            onClick={() => handleSelectMethod("/build/linkedin")}
          >
            <CardContent className="flex flex-col items-center justify-center p-10 text-center h-full">
              <div className="w-20 h-20 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mb-6">
                <Upload size={40} />
              </div>
              <h3 className="font-bold text-2xl mb-3">Upload LinkedIn</h3>
              <p className="text-muted-foreground">Export your profile to PDF and we will do the rest using AI. Highly recommended!</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:border-primary hover:bg-primary/5 hover:scale-105"
            onClick={() => handleSelectMethod("/build/form")}
          >
            <CardContent className="flex flex-col items-center justify-center p-10 text-center h-full">
              <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6">
                <PenLine size={40} />
              </div>
              <h3 className="font-bold text-2xl mb-3">Manual Entry</h3>
              <p className="text-muted-foreground">Fill out our beautifully designed forms section by section.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
