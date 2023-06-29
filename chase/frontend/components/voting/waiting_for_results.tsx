import React from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useI18nContext } from "@/i18n/i18n-react";

/**
 * This Component is used in the Voting Component.
 * It displays a message, when the vote of the user was registered, but the outcome is not yet known.
 */

export default function WaitingForResults() {
  const { LL } = useI18nContext();

  return (
    <div className="my-4 shadow-xl rounded-md p-4 bg-white border border-dmun flex justify-center items-center w-11/12 mr-3">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-lg">
          <FontAwesomeIcon icon={faCheckCircle} className="text-gray-icon" />
          <div className="text-gray-text font-bold">
            {LL.participants.voting.votingButtons.VOTE_REGISTERED()}
          </div>
        </div>
        <div className="text-sm text-gray-icon">
          {LL.participants.voting.votingButtons.VOTE_REGISTERED_MESSAGE()}
        </div>
      </div>
    </div>
  );
}