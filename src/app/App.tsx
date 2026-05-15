import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import RepoImport from "./components/RepoImport";
import Processing from "./components/Processing";
import Dashboard from "./components/Dashboard";

export type View = "landing" | "import" | "processing" | "dashboard";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [repoUrl, setRepoUrl] = useState("https://github.com/vercel/next-commerce");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className="size-full"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {view === "landing" && (
        <Landing onGetStarted={() => setView("import")} />
      )}
      {view === "import" && (
        <RepoImport
          onAnalyze={(url) => {
            setRepoUrl(url);
            setView("processing");
          }}
          onBack={() => setView("landing")}
        />
      )}
      {view === "processing" && (
        <Processing
          repoUrl={repoUrl}
          onComplete={() => setView("dashboard")}
        />
      )}
      {view === "dashboard" && (
        <Dashboard
          repoUrl={repoUrl}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          onBack={() => setView("import")}
        />
      )}
    </div>
  );
}
