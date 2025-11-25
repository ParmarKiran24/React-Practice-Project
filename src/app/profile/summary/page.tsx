import ProfileSummary from "@/components/forms/ProfileSummary";

// Replace this mock object with data fetched from Drizzle DB
const mockData = {
  personal: {},
  address: {},
  reservation: {},
  qualification: [],
  bank: {},
  photo: null,
  signature: null,
  documents: [],
};

export default function SummaryPage() {
  return (
    <ProfileSummary
      data={mockData}
      onSubmit={() => {
        console.log("Application submitted.");
        // redirect or show success screen
      }}
      onEditSection={(section) => {
        console.log("Go to edit:", section);
        // router.push(`/profile/${section}`);
      }}
    />
  );
}

// How to feed real data

// When the user reaches this page:

// Fetch from DB:

// const profile = await db.query.profiles.findFirst({ where: eq(profiles.userId, session.user.id) });


// Pass the result to the component:

// <ProfileSummary data={profile} ... />


// Each document should include:

// { name: "SSC Certificate", url: "https://s3/.../file.pdf" }


// Photo/signature should include:

// photo: { url: "https://s3/..." }