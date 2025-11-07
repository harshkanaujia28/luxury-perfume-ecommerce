// export async function fetchGeneralSettings() {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   if (!apiUrl) {
//     throw new Error("❌ NEXT_PUBLIC_API_URL is not defined in your environment");
//   }

//   const res = await fetch(`${apiUrl}/settings/general`, {
//     // ISR caching: revalidate every 60s
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error(`❌ Failed to fetch settings: ${errorText}`);
//   }

//   const data = await res.json();
//   return data; // contains: { general: {...}, ... }
// }
