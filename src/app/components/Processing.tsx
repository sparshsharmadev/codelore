import { useState, useEffect } from "react";
import { Check, Terminal } from "lucide-react";

interface ProcessingProps {
  repoUrl: string;
  onComplete: () => void;
}

const steps = [
  { id: "clone",   label: "cloning repository",          detail: "fetching source tree and git history",                     duration: 1200 },
  { id: "parse",   label: "parsing 247 files",            detail: "building AST for TypeScript, CSS, and JSON",              duration: 1800 },
  { id: "deps",    label: "resolving import graph",       detail: "mapping all module dependencies and cross-references",     duration: 1400 },
  { id: "arch",    label: "mapping architecture",         detail: "identifying layers, modules, and boundaries",              duration: 1600 },
  { id: "flow",    label: "tracing execution paths",      detail: "following request paths from entry to data layer",         duration: 1300 },
  { id: "ai",      label: "generating AI insights",       detail: "synthesizing explanations, onboarding guide, and Q&A",    duration: 2200 },
];

export default function Processing({ repoUrl, onComplete }: ProcessingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [globalProgress, setGlobalProgress] = useState(0);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [dots, setDots] = useState(".");

  const repoName = repoUrl.replace("https://github.com/", "");

  useEffect(() => {
    const interval = setInterval(() => setDots((d) => (d.length >= 3 ? "." : d + ".")), 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const logs = [
      `$ git clone --depth=1 ${repoUrl}`,
      `cloning into '${repoName.split("/")[1]}'...`,
      `remote: enumerating objects: 247, done.`,
      `remote: counting objects: 100% (247/247), done.`,
    ];
    let i = 0;
    const t = setInterval(() => {
      if (i < logs.length) { setLogLines((p) => [...p, logs[i]]); i++; }
      else clearInterval(t);
    }, 350);
    return () => clearInterval(t);
  }, [repoUrl, repoName]);

  useEffect(() => {
    let stepIdx = 0;
    let progressVal = 0;

    const runNextStep = () => {
      if (stepIdx >= steps.length) {
        setGlobalProgress(100);
        setTimeout(onComplete, 600);
        return;
      }
      setCurrentStep(stepIdx);
      const step = steps[stepIdx];
      const progressPerStep = 100 / steps.length;
      const endProgress = (stepIdx + 1) * progressPerStep;

      const pi = setInterval(() => {
        progressVal = Math.min(progressVal + 0.5, endProgress);
        setGlobalProgress(progressVal);
        if (progressVal >= endProgress) clearInterval(pi);
      }, step.duration / (progressPerStep * 20));

      setTimeout(() => {
        clearInterval(pi);
        setGlobalProgress(endProgress);
        setCompletedSteps((prev) => new Set([...prev, stepIdx]));
        stepIdx++;
        setTimeout(runNextStep, 100);
      }, step.duration);
    };

    runNextStep();
  }, [onComplete]);

  return (
    <div
      className="min-h-full bg-zinc-950 text-zinc-300 flex flex-col"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-3 flex items-center gap-2 text-zinc-600 text-xs">
        <Terminal className="w-3.5 h-3.5" />
        <span>codelens</span>
        <span className="text-zinc-800">/</span>
        <span>analyze</span>
        <span className="text-zinc-800">/</span>
        <span className="text-zinc-500">{repoName}</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          {/* Repo */}
          <div className="text-xs text-zinc-600 mb-1">
            <span className="text-zinc-500">$</span> codelens analyze github.com/{repoName}
          </div>
          <div className="text-xs text-zinc-700 mb-8">analyzing codebase{dots}</div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-zinc-600">{Math.round(globalProgress)}%</span>
              {globalProgress === 100 && (
                <span className="text-xs text-zinc-400">done</span>
              )}
            </div>
            <div className="h-px bg-zinc-800">
              <div
                className="h-full bg-zinc-400 transition-all duration-200"
                style={{ width: `${globalProgress}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-1 mb-8">
            {steps.map((step, i) => {
              const isDone = completedSteps.has(i);
              const isActive = currentStep === i && !isDone;
              const isPending = !isDone && !isActive;
              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 py-1.5 text-xs transition-opacity ${
                    isPending ? "opacity-25" : isDone ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <div className="flex-shrink-0 w-4 flex items-center justify-center mt-0.5">
                    {isDone ? (
                      <Check className="w-3 h-3 text-zinc-400" />
                    ) : isActive ? (
                      <span className="text-zinc-300">›</span>
                    ) : (
                      <span className="text-zinc-700">·</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={isDone ? "text-zinc-600" : isActive ? "text-zinc-200" : "text-zinc-700"}>
                      {step.label}
                    </span>
                    {isActive && (
                      <div className="text-zinc-600 mt-0.5">{step.detail}</div>
                    )}
                  </div>
                  {isDone && <span className="text-zinc-700 flex-shrink-0">ok</span>}
                </div>
              );
            })}
          </div>

          {/* Terminal log */}
          <div className="border border-zinc-800 bg-zinc-900">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800 text-xs text-zinc-700">
              <span>analysis.log</span>
            </div>
            <div className="p-3 space-y-1 min-h-[100px] max-h-[140px] overflow-y-auto">
              {logLines.map((line, i) => (
                <div
                  key={i}
                  className={`text-xs ${line.startsWith("$") ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  {line}
                </div>
              ))}
              {globalProgress < 100 && (
                <div className="text-xs text-zinc-700">
                  › {steps[currentStep]?.detail}{dots}
                </div>
              )}
              {globalProgress === 100 && (
                <div className="text-xs text-zinc-400">analysis complete. loading dashboard...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
