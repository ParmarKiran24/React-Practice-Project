import DocumentDetails from "@/components/forms/DocumentDetails";

export default function DocumentsPage() {
  return <DocumentDetails onNext={(data) => console.log("Docs ready:", data)} />;
}
