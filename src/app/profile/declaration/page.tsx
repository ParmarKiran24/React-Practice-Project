import Declaration from "@/components/forms/Declaration";

export default function DeclarationPage() {
  return (
    <Declaration
      onSubmit={(payload) => {
        // Final submit: replace with your API call / Drizzle DB save + server-side verification
        // Example: await fetch('/api/profile/complete', { method: 'POST', body: JSON.stringify(payload) })
        console.log("Final submit payload:", payload);
        // You might want to redirect user to profile summary / success page here.
      }}
    />
  );
}
