import React from "react";

const disclaimerText =
  "Disclaimer: This presentation is not ready to be used and has not been reviewed by a human yet.";

const DeckDisclaimer: React.FC = () => (
  <div className="mb-4 rounded-md border border-yellow-500/40 bg-yellow-500/10 px-4 py-2 text-xs font-medium text-yellow-100 md:text-sm">
    {disclaimerText}
  </div>
);

export default DeckDisclaimer;
