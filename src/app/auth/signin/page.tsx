import SignupForm from "@/components/forms/SignupForm";

export default function SignupPage() {
  return <SignupForm onSuccess={(data) => console.log("Signup success:", data)} />;
}
