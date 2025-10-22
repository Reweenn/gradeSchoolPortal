import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ClientPage from "./pages/ClientPage";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";

// Modes for the auth form
type Mode = "login" | "register";

type Alert = { type: "success" | "error"; text: string } | null;

const LOGO_URL = "/logo1.png"; // Updated to use client/public/logo1.png

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert>(null);
  const [mounted, setMounted] = useState(false);
  const [pulseSide, setPulseSide] = useState<"left" | "right" | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const [knobBump, setKnobBump] = useState(false);
  const [contentHidden, setContentHidden] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");

  const API_BASE = "http://localhost:5000/api/auth";
  const isRegister = mode === "register";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30); // trigger entrance animation
    return () => clearTimeout(t);
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setGrade("");
  };

  const handleToggle = () => {
    const current = mode;
    const next = current === "login" ? "register" : "login";
    // Show ping ripple from the current knob position
    setPulseSide(current === "login" ? "left" : "right");
    setPulseKey((k) => k + 1);
    // Quick bump scale on the knob
    setKnobBump(true);
    setTimeout(() => setKnobBump(false), 180);
    // Fade out current content, swap mode, fade in
    setContentHidden(true);
    setTimeout(() => {
      setMode(next);
      setContentHidden(false);
    }, 180);
    // Remove ripple after it plays
    setTimeout(() => setPulseSide(null), 520);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setAlert(null);
      
      const url = mode === "register" ? `${API_BASE}/register` : `${API_BASE}/login`;
      console.log('Mode:', mode);
      
      const body =
        mode === "register"
          ? { name, email, password, grade: grade || undefined }
          : { email, password };
      
      console.log('Making request to:', url);

      const res = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(body),
      });

      // Get the response clone before attempting to read the body
      const resClone = res.clone();
      
      let data;
      try {
        data = await res.json();
        console.log('Response data:', data);
      } catch (parseError) {
        try {
          // Try reading the cloned response as text if JSON parsing fails
          const text = await resClone.text();
          console.error('Server response (text):', text);
          throw new Error('Server response was not in JSON format');
        } catch (textError) {
          console.error('Failed to read response:', textError);
          throw new Error('Failed to read server response');
        }
      }

      if (!res.ok) {
        const errorMessage = data?.message || data?.error || "Request failed";
        console.error('Request failed:', errorMessage);
        throw new Error(errorMessage);
      }

      if (mode === "register") {
        setAlert({
          type: "success",
          text: "Registered successfully! Please log in.",
        });
        setMode("login");
        resetForm();
      } else {
        // Handle login success
        if (data?.token) {
          login(data.token);
          navigate('/client');
          setAlert({
            type: "success",
            text: "Login successful!",
          });
        } else {
          throw new Error("No token received from server");
        }
      }
    } catch (err: any) {
      setAlert({ type: "error", text: err?.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-100 via-sky-50 to-slate-100">
      {/* Background playful confetti dots */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 -left-10 h-44 w-44 rounded-full bg-sky-300/30 blur-2xl animate-pulse" />
        <div className="absolute top-1/3 -right-10 h-52 w-52 rounded-full bg-emerald-300/30 blur-2xl animate-pulse [animation-delay:120ms]" />
        <div className="absolute bottom-10 left-1/4 h-36 w-36 rounded-full bg-pink-300/30 blur-2xl animate-pulse [animation-delay:240ms]" />
      </div>

      {/* App header */}
      <header className="mx-auto flex max-w-6xl items-center justify-center gap-3 p-6">
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-2 shadow backdrop-blur">
          <span className="text-2xl">🧑‍🏫</span>
          <h1 className="text-lg font-extrabold tracking-tight text-slate-800">
            Grade School Portal
          </h1>
        </div>
      </header>

      {/* Card container */}
      <main className="px-4 pb-16">
        <div
          className={
            "mx-auto flex w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 " +
            (mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6") +
            " flex-row"
          }
        >
          {/* Chalkboard panel (dark) */}
          <section className="relative hidden w-1/2 items-center justify-center bg-slate-900 p-10 text-white md:flex">
            {/* Chalk texture overlay */}
            <div className="absolute inset-0 opacity-10 [background-image:url('https://www.transparenttextures.com/patterns/black-linen.png')]" />

            {/* Hexagon container with logo image (clean layering) */}
            <div className="relative z-10 flex h-72 w-72 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
              <div className="relative h-44 w-44">
                {/* Hexagon outline */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full text-white/70 drop-shadow-md"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polygon points="50,5 93,28 93,72 50,95 7,72 7,28" />
                </svg>
                {/* Centered circular logo inside the hexagon */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="h-28 w-28 overflow-hidden rounded-full bg-white ring-4 ring-white/60 shadow-lg">
                    <img
                      src={LOGO_URL}
                      alt="School logo"
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Playful chalk doodles */}
            <div className="pointer-events-none absolute left-6 top-6 text-3xl opacity-50">
              ✏️
            </div>
            <div className="pointer-events-none absolute right-8 bottom-8 text-3xl opacity-50">
              🧮
            </div>
          </section>

          {/* Form panel (light) */}
          <section className="relative z-10 w-full bg-slate-100 p-8 md:w-1/2 min-h-[460px]">
            {/* Animated content wrapper */}
            <div className={"transition-all duration-300 " + (contentHidden ? "opacity-0 -translate-y-1 scale-[0.99]" : "opacity-100 translate-y-0 scale-100")}>
            {/* Toggle switch and title row */}
            <div className="mb-6 flex items-center justify-between">
              {/* Toggle */}
              <button
                type="button"
                aria-label="Toggle login/register"
                className="relative h-10 w-20 overflow-hidden rounded-full bg-slate-300 shadow-inner transition focus:outline-none focus:ring-2 focus:ring-sky-300"
                onClick={handleToggle}
              >
                {/* ripple effect */}
                {pulseSide && (
                  <span
                    key={pulseKey}
                    className={
                      "absolute inset-y-1 h-8 w-8 rounded-full bg-sky-400/40 animate-ping " +
                      (pulseSide === "left" ? "left-1" : "right-1")
                    }
                  />
                )}
                {/* knob */}
                <span
                  className={
                    "absolute inset-y-1 left-1 w-8 rounded-full bg-slate-900 shadow transition-transform duration-300 ease-out " +
                    (mode === "login" ? "translate-x-0" : "translate-x-10") +
                    (knobBump ? " scale-90" : "")
                  }
                />
              </button>

              <h2 className="text-3xl font-black tracking-tight text-slate-800">
                {mode === "register" ? "Sign up" : "Login"}
              </h2>

              {/* Spacer for alignment */}
              <div className="w-20" />
            </div>

            {/* Alert (reserve height to avoid jump) */}
            <div className="mb-4 min-h-[44px]">
              {alert && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-lg border p-3 text-sm ${
                    alert.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  {alert.text}
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="h-[40px]">
                {isRegister ? (
                  <div>
                    <label className="mb-1 block text-xs font-extrabold tracking-widest text-slate-600">
                      USERNAME
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none ring-sky-300 transition placeholder:text-slate-400 placeholder:opacity-90 [&::placeholder]:uppercase focus:ring"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="USERNAME"
                      required
                    />
                  </div>
                ) : (
                  <div className="h-full rounded-lg px-1 py-2 flex flex-col justify-center">
                    <p className="text-xl font-semibold text-slate-900">
                      Welcome to Glorious God's Family Christian School!
                    </p>
                    <p className="text-m text-slate-500">
                      Please log in with your school email to continue.
                    </p>
                  </div>
                )}
              </div>

              <div className="h-[88px] flex flex-col justify-end">
                <label className="mb-1 block text-xs font-extrabold tracking-widest text-slate-600">
                  EMAIL
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none ring-sky-300 transition placeholder:text-slate-400 placeholder:opacity-90 [&::placeholder]:uppercase focus:ring"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL"
                  required
                />
              </div>

              <div className="h-[88px] flex flex-col justify-end">
                <label className="mb-1 block text-xs font-extrabold tracking-widest text-slate-600">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none ring-sky-300 transition placeholder:text-slate-400 placeholder:opacity-90 [&::placeholder]:uppercase focus:ring"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  required
                />
              </div>

              <div className="h-[60px]">
                <div className={isRegister ? "" : "invisible"}>
                  <label className="mb-1 block text-xs font-extrabold tracking-widest text-slate-600">
                    GRADE (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none ring-sky-300 transition placeholder:text-slate-400 placeholder:opacity-90 [&::placeholder]:uppercase focus:ring"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="e.g., 3"
                    disabled={!isRegister}
                    aria-hidden={!isRegister}
                    tabIndex={isRegister ? 0 : -1}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-teal-500 py-2.5 font-extrabold tracking-wide text-white shadow transition hover:bg-teal-600 active:scale-[0.99] disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Please wait..." : mode === "register" ? "SIGN UP" : "LOG IN"}
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                Tap the toggle to switch {mode === "register" ? "to Login" : "to Sign up"}.
              </div>
            </form>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-6 text-center text-xs text-slate-500">
        Made with 💙 for curious young minds
      </footer>
    </div>
  );
};

// Protected Route wrapper
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode;
  allowedRoles?: Array<'client' | 'admin' | 'staff'>;
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard if authenticated but wrong role
    return <Navigate to={`/${userRole}`} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route 
            path="/client" 
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/staff" 
            element={
              <ProtectedRoute allowedRoles={['staff']}>
                <StaffPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
