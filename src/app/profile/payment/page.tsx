import Payment from "@/components/forms/Payment";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  return (
    <Payment
      amount={500}
      applicationId="APPL-2025-0001"
      onPaid={(payload) => {
        console.log("Paid callback:", payload);
        // On success: redirect to success page
        if (payload.status === "paid") {
          router.push("/profile/success");
        } else {
          // show pending status page or keep on payments
          router.push("/profile/status");
        }
      }}
    />
  );
}
