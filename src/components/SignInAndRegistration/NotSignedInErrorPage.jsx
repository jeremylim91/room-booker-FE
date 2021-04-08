import React from 'react';
import {deleteFromStorage} from '@rehooks/local-storage';
import {formModes} from '../../createBookingStore';

export default function NotSignedInErrorPage() {
  const {FORM_STEP} = formModes;
  deleteFromStorage(FORM_STEP);

  return (
    <div>
      Looks like you have not signed in. Please sign in to access the page.
    </div>
  );
}
