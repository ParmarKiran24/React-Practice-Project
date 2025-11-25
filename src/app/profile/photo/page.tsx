import PhotoSignature from "@/components/forms/PhotoSignature";

export default function PhotoPage() {
  return <PhotoSignature onNext={(data) => console.log("Complete photo step: ", data)} />;
}