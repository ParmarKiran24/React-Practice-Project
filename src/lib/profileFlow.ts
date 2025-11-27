// Profile application flow configuration
export const PROFILE_STEPS = [
  {
    id: 'personal',
    path: '/profile/personal',
    title: 'Personal Details',
    component: 'PersonalDetails',
  },
  {
    id: 'address',
    path: '/profile/personal', // Address is part of personal
    title: 'Address Details',
    component: 'AddressDetails',
  },
  {
    id: 'contact',
    path: '/profile/personal', // Contact is part of personal
    title: 'Contact Details',
    component: 'ContactForm',
  },
  {
    id: 'qualification',
    path: '/profile/qualification',
    title: 'Qualification Details',
    component: 'QualificationDetails',
  },
  {
    id: 'reservation',
    path: '/profile/reservation',
    title: 'Reservation Details',
    component: 'ReservationDetails',
  },
  {
    id: 'photo',
    path: '/profile/photo',
    title: 'Photo & Signature',
    component: 'PhotoSignature',
  },
  {
    id: 'documents',
    path: '/profile/documents',
    title: 'Document Upload',
    component: 'DocumentDetails',
  },
  {
    id: 'bank',
    path: '/profile/bank',
    title: 'Bank Details',
    component: 'BankDetails',
  },
  {
    id: 'declaration',
    path: '/profile/declaration',
    title: 'Declaration',
    component: 'Declaration',
  },
  {
    id: 'summary',
    path: '/profile/summary',
    title: 'Profile Summary',
    component: 'ProfileSummary',
  },
  {
    id: 'payment',
    path: '/profile/payment',
    title: 'Payment',
    component: 'Payment',
  },
  {
    id: 'success',
    path: '/profile/success',
    title: 'Success',
    component: 'SuccessPage',
  },
];

export function getNextStep(currentPath: string): string | null {
  const currentIndex = PROFILE_STEPS.findIndex(step => step.path === currentPath);
  if (currentIndex === -1 || currentIndex === PROFILE_STEPS.length - 1) {
    return null;
  }
  return PROFILE_STEPS[currentIndex + 1].path;
}

export function getPreviousStep(currentPath: string): string | null {
  const currentIndex = PROFILE_STEPS.findIndex(step => step.path === currentPath);
  if (currentIndex <= 0) {
    return null;
  }
  return PROFILE_STEPS[currentIndex - 1].path;
}

export function getStepProgress(currentPath: string): number {
  const currentIndex = PROFILE_STEPS.findIndex(step => step.path === currentPath);
  if (currentIndex === -1) return 0;
  return Math.round(((currentIndex + 1) / PROFILE_STEPS.length) * 100);
}
