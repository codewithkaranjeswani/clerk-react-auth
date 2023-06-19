import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import { Link, BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./index.css"

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function PublicPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-sans my-10">Public page</h1>
      <Link className="border-2" to="/protected">Go to protected page</Link>
    </div>
  );
}

function ProtectedPage() {
  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-3xl font-sans mb-10">Protected page</h1>
      <UserButton />
    </div>
  );
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route
          path="/sign-in/*"
          element={
            <SignIn appearance={{ elements: { rootBox: "mx-auto my-10" } }} routing="path" path="/sign-in" />
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <SignUp appearance={{ elements: { rootBox: "mx-auto my-10" } }} routing="path" path="/sign-up" />
          }
        />
        <Route
          path="/protected"
          element={
            <>
              <SignedIn>
                <ProtectedPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;