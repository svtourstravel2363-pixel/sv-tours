export type LegalSection = { h: string; p: string[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };

export const LEGAL_DEFAULTS: Record<string, LegalDoc> = {
  terms: { title: "Terms & Conditions", updated: "13 November 2026", intro: 'These Terms & Conditions govern your use of svtourstravel.com and all travel services provided under the brand "SV Tours & Travels" by SV Enterprises ("we", "us", "the Company"), Pune, Maharashtra, India. By using the website or booking a service you agree to these terms.', sections: [
        { h: "Services", p: ["We provide local car rental, outstation cab, airport pickup and drop, tempo traveller / Urbania hire and tour package services. Vehicles shown on the website (for example Hyundai Aura, Xcent, Dzire, Toyota Glanza, Rumion, Ertiga, Creta, Innova Crysta, Force Urbania) are indicative; an equivalent vehicle of the same category may be provided."] },
        { h: "Bookings", p: ["Submitting the booking form or a WhatsApp enquiry is a request only. A booking is confirmed only when we confirm it by call, message or email. We may decline a booking where a vehicle or driver is unavailable.", "You must provide accurate name, mobile number, pickup details and passenger count. The number of passengers must not exceed the seating capacity of the vehicle."] },
        { h: "Rates & Charges", p: ["Local packages are 8 hours / 80 KM. Extra kilometres and extra hours are charged at the rates published on the website. Outstation trips are charged per KM with a minimum running of 300 KM per day.", "Toll charges, parking charges, state entry/border taxes and driver allowance are extra unless stated otherwise in writing. Night halt and night driving charges may apply. Rates may change without notice; the rate confirmed at booking applies to that booking.", "Tempo Traveller / Urbania and tour package pricing is quoted on request."] },
        { h: "Payment", p: ["Payment is to be made as agreed at confirmation, by cash, UPI or bank transfer. We may ask for an advance to confirm a booking. GST or other applicable taxes will be added where required by law."] },
        { h: "Customer Responsibilities", p: ["Passengers must behave respectfully and must not carry illegal goods, drugs, weapons or any prohibited items. Smoking, alcohol consumption and spitting inside the vehicle are not allowed. Any damage, or cleaning needed beyond normal use, will be charged to the customer.", "Customers must be ready at the agreed time and place. Waiting beyond the free period may be charged as extra hours."] },
        { h: "Delays, Route Changes & Force Majeure", p: ["We make every effort to be on time but are not liable for delays caused by traffic, weather, road closures, accidents, breakdowns, strikes, government orders or other events beyond our control. Routes and halts may be changed for safety reasons. We may substitute a vehicle or driver in case of breakdown."] },
        { h: "Liability", p: ["Our vehicles are operated by licensed drivers and carry applicable permits and insurance. Our liability is limited to the extent covered by law and by our insurance. We are not responsible for loss of or damage to personal belongings left in the vehicle. To the maximum extent permitted by law, our liability for any claim shall not exceed the amount paid by you for the specific trip."] },
        { h: "User Accounts & Reviews", p: ["You are responsible for keeping your login details confidential and for activity under your account. Reviews are published only after admin approval. We may remove reviews that are abusive, false, promotional or unlawful.", "We may suspend or terminate accounts misused or used to submit false bookings."] },
        { h: "Intellectual Property", p: ["All content on this website, including the name, logo, text and design, belongs to SV Enterprises / SV Tours & Travels and may not be copied or reused without written permission."] },
        { h: "Cancellation & Refund", p: ["Cancellations and refunds are governed by our Cancellation & Refund Policy, which forms part of these terms."] },
        { h: "Governing Law & Jurisdiction", p: ["These terms are governed by the laws of India. Any dispute arising out of or in connection with these terms or our services shall be subject to the exclusive jurisdiction of the courts at Pune, Maharashtra."] },
        { h: "Changes", p: ["We may update these terms from time to time. The updated version will be posted on this page and applies from the date of posting."] },
      ] },
  privacy: { title: "Privacy Policy", updated: "13 November 2026", intro: "SV Enterprises, trading as SV Tours & Travels (svtourstravel.com), respects your privacy. This policy explains what personal data we collect, how we use it and your rights, in line with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (India).", sections: [
        { h: "Information We Collect", p: ["Details you provide: name, mobile number, email address, pickup/drop locations, travel dates and times, passenger count and special requirements submitted through booking forms, WhatsApp enquiries, account sign-up and reviews.", "Technical data: basic device and browser information and cookies needed to keep you logged in and the site working."] },
        { h: "How We Use Your Information", p: ["To process and confirm bookings, contact you about your trip, provide customer support, manage your account, publish approved reviews, prevent fraud and misuse, and comply with legal obligations. We do not sell your personal data."] },
        { h: "Sharing", p: ["We share necessary trip details (such as name, phone and pickup point) with the driver assigned to your trip. We use trusted service providers such as Supabase (database and authentication), Vercel (hosting) and WhatsApp (messaging) to run our services. We may disclose information if required by law, court order or to protect rights and safety."] },
        { h: "Cookies", p: ["We use essential cookies to maintain your login session. You can disable cookies in your browser, but account features may not work."] },
        { h: "Data Retention & Security", p: ["We keep booking and account data for as long as needed for service, accounting and legal purposes. We use access controls and encrypted connections to protect data, but no online system is completely secure."] },
        { h: "Your Rights", p: ["You may request access to, correction of, or deletion of your personal data, or withdraw consent, by contacting us at the email or phone below. Some data may be retained where law requires."] },
        { h: "Reviews", p: ["Name and review text you submit may be displayed publicly after admin approval."] },
        { h: "Children", p: ["Our services are intended for adults. Bookings for minors must be made by a parent or guardian."] },
        { h: "Changes & Grievances", p: ["We may update this policy; the latest version is always on this page. For privacy queries or grievances, contact us using the details below. Disputes are subject to the jurisdiction of the courts at Pune, Maharashtra."] },
      ] },
  refund: { title: "Cancellation & Refund Policy", updated: "13 November 2026", intro: "This policy applies to all bookings made with SV Enterprises, trading as SV Tours & Travels. Please contact us as early as possible if your plans change.", sections: [
        { h: "Customer Cancellation", p: ["More than 24 hours before pickup: free cancellation; any advance paid is refunded in full.", "Between 6 and 24 hours before pickup: a cancellation charge of up to 25% of the advance or estimated fare may apply.", "Less than 6 hours before pickup or no-show: the advance is non-refundable, and a minimum charge may apply where the vehicle has already been dispatched.", "Tour packages and Tempo Traveller / Urbania bookings: cancellation terms are shared at the time of confirmation and may be stricter due to advance arrangements."] },
        { h: "Cancellation by Us", p: ["If we cannot provide a vehicle or must cancel due to unavoidable circumstances, you will receive a full refund of any advance paid, or an equivalent replacement vehicle."] },
        { h: "Trip Interrupted or Shortened", p: ["If you end a trip early, charges apply for the minimum package booked (for example the 8 hr / 80 km package or 300 km per day for outstation). Unused kilometres or days are not refundable."] },
        { h: "Refund Process", p: ["Approved refunds are returned to the original payment method or bank account within 5–7 working days. Toll, parking and similar charges already paid on your behalf are not refundable."] },
        { h: "Disputes & Jurisdiction", p: ["For any complaint, contact us within 7 days of the trip. All disputes are subject to the exclusive jurisdiction of the courts at Pune, Maharashtra."] },
      ] },
};

/** "## Heading" lines start a section; blank lines separate paragraphs. */
export function parseBody(body: string): LegalSection[] {
  const sections: LegalSection[] = [];
  for (const block of body.split(/^## /m).map((b) => b.trim()).filter(Boolean)) {
    const [h, ...rest] = block.split("\n");
    sections.push({ h: h.trim(), p: rest.join("\n").split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean) });
  }
  return sections;
}

export function serializeBody(sections: LegalSection[]): string {
  return sections.map((s) => `## ${s.h}\n\n${s.p.join("\n\n")}`).join("\n\n");
}
