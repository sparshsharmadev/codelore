import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mockExecutionFlow, ExecutionStep } from "../../data/mockData";

const stepTypeLabel: Record<string, string> = {
  route:     "route",
  component: "render",
  fetch:     "fetch",
  action:    "action",
  cache:     "cache",
  render:    "render",
};

const scenarios = [
  { id: "product",  label: "product page load",  desc: "GET /product/blue-hoodie → SSR → shopify fetch → HTML stream" },
  { id: "add-cart", label: "add to cart",         desc: "click 'add to cart' → server action → shopify mutation → cache revalidation" },
  { id: "search",   label: "search query",        desc: "user types → URL update → getProducts() → results grid" },
];

interface StepCardProps {
  step: ExecutionStep;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function StepCard({ step, index, isExpanded, onToggle }: StepCardProps) {
  return (
    <div className="relative">
      {index < mockExecutionFlow.length - 1 && (
        <div className="absolute left-4 top-full w-px bg-zinc-800 z-0" style={{ height: 8 }} />
      )}
      <div className="border border-zinc-800 hover:border-zinc-700 transition-colors">
        <button
          onClick={onToggle}
          className="w-full flex items-start gap-4 px-4 py-3.5 text-left"
        >
          <div className="flex-shrink-0 flex items-center gap-3 mt-0.5">
            <span className="text-xs text-zinc-700 w-4">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-xs text-zinc-700 w-10">{stepTypeLabel[step.type]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-zinc-300 mb-0.5" style={{ fontWeight: 500 }}>
              {step.title}
            </div>
            <div className="text-xs text-zinc-600 leading-relaxed">{step.description}</div>
            <div className="text-xs text-zinc-700 mt-1">{step.file}</div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 text-xs">
            {step.duration && <span className="text-zinc-700">{step.duration}</span>}
            {isExpanded
              ? <ChevronUp className="w-3.5 h-3.5 text-zinc-600" />
              : <ChevronDown className="w-3.5 h-3.5 text-zinc-600" />
            }
          </div>
        </button>
        {isExpanded && step.details && (
          <div className="px-4 pb-4 border-t border-zinc-800 pt-3 ml-10">
            <div className="space-y-1.5">
              {step.details.map((d, i) => (
                <div key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                  <span className="text-zinc-800">→</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExecutionFlow() {
  const [activeScenario, setActiveScenario] = useState("product");
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set(["1", "2"]));

  const toggleStep = (id: string) => {
    setExpandedSteps((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="max-w-2xl mx-auto px-8 py-8">

        {/* Scenario tabs */}
        <div className="text-xs text-zinc-700 mb-3"># select a flow to trace</div>
        <div className="flex border-b border-zinc-800 mb-6 gap-0">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(s.id)}
              className={`px-4 py-2 text-xs transition-colors border-b-2 -mb-px ${
                activeScenario === s.id
                  ? "border-zinc-400 text-zinc-200"
                  : "border-transparent text-zinc-600 hover:text-zinc-400"
              }`}
              style={{ fontWeight: activeScenario === s.id ? 500 : 400 }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Scenario desc */}
        <div className="border border-zinc-800 px-4 py-3 mb-6">
          <div className="text-xs text-zinc-600">
            <span className="text-zinc-500">›</span> {scenarios.find((s) => s.id === activeScenario)?.desc}
          </div>
          <div className="text-xs text-zinc-700 mt-1">total: ~415ms · 2 external calls · 7 steps</div>
        </div>

        {/* Timeline bar */}
        <div className="border border-zinc-800 px-4 py-3 mb-6">
          <div className="text-xs text-zinc-700 mb-2">timeline</div>
          <div className="flex h-5 gap-px">
            {mockExecutionFlow.map((step, i) => {
              const widths = [5, 18, 28, 12, 15, 22];
              const w = widths[i] || 10;
              const brightness = [60, 50, 40, 55, 45, 50];
              const b = brightness[i] || 50;
              return (
                <div
                  key={step.id}
                  style={{ width: `${w}%`, backgroundColor: `rgb(${b},${b},${b})` }}
                  className="cursor-pointer hover:opacity-80 transition-opacity relative group"
                  onClick={() => toggleStep(step.id)}
                  title={step.title}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-zinc-800">0ms</span>
            <span className="text-xs text-zinc-800">415ms</span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {mockExecutionFlow.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              index={i}
              isExpanded={expandedSteps.has(step.id)}
              onToggle={() => toggleStep(step.id)}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 border border-zinc-800 px-4 py-4">
          <div className="text-xs text-zinc-700 mb-3"># summary</div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { v: "7",      l: "steps" },
              { v: "~415ms", l: "total latency" },
              { v: "2",      l: "external calls" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-sm text-zinc-300" style={{ fontWeight: 700 }}>{s.v}</div>
                <div className="text-xs text-zinc-700 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
