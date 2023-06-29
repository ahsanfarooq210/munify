import React, { useEffect, useState } from "react";
import WidgetTemplate from "../widget_template";
import NoDataPlaceholder from "../no_data_placeholder";
import { Voting } from "@/custom_types";
import VotingBar from "@components/voting/voting_bar";
import CastVote from "@components/voting/cast_vote";
import CountryGrid from "@components/voting/country_grid";
import { ScrollPanel } from "primereact/scrollpanel";
import { myCountry } from "@/test_data";
import InformationSection from "@/components/voting/information_section";
import WaitingForResults from "@components/voting/waiting_for_results";
import { useI18nContext } from "@/i18n/i18n-react";
import FlipMove from "react-flip-move";

/**
 * This Component is the main Component of the Voting Area. It combines several other
 * Components like the InformationSection, the VotingBar, the CastVote Component, the CountryGrid, the Outcome
 * Component, and the WaitingForResults Component.
 * It also handles all the logic for the display of the different Components.
 * For example, it checks if the user's country is voting, if the user's country has already voted, and if the voting
 * is still ongoing. Based on these checks, it decides which Component to display.
 */

export default function VotingArea({
  votingData,
}: {
  votingData: Voting | undefined;
}) {
  const { LL } = useI18nContext();
  const [myCountryIsVoting, setMyCountryIsVoting] = useState<boolean>(false);
  const [myCountryHasVoted, setMyCountryHasVoted] = useState<boolean>(false);

  useEffect(() => {
    if (votingData) {
      setMyCountryIsVoting(votingData.votingCountries.includes(myCountry));

      const myVote = votingData.votes.find(
        (vote) => vote.country === myCountry,
      )?.vote;
      setMyCountryHasVoted(!!myVote);
    }
  }, [votingData]);

  return (
    <>
      <WidgetTemplate cardTitle="">
        {!votingData ? (
          <NoDataPlaceholder title={LL.participants.voting.NO_DATA_VOTING()} />
        ) : (
          <div className="flex flex-col gap-4">
            <ScrollPanel
              className="w-full overflow-y-auto overflow-x-hidden custom-scrollbar"
              style={{ height: "80vh" }}
            >
              <FlipMove duration={1000} className="flex flex-col gap-2">
                <div key="Header">
                  <InformationSection {...votingData} />
                </div>
                <div key="Bar">
                  <VotingBar {...votingData} />
                </div>
                <div key="Grid">
                  <CountryGrid {...votingData} />
                  <div className="h-24" />{" "}
                  {/* This is a hack to make the last element visible */}
                </div>
              </FlipMove>
            </ScrollPanel>
            <div className="relative h-full w-full flex flex-col justify-center items-center z-10">
              <div className="absolute bottom-0 left-0 flex justify-center items-center w-full">
                {votingData && !myCountryHasVoted && myCountryIsVoting && (
                  <CastVote myCountry={myCountry} {...votingData} />
                )}
                {votingData && !votingData.outcome && myCountryHasVoted && (
                  <WaitingForResults />
                )}
              </div>
            </div>
          </div>
        )}
      </WidgetTemplate>
    </>
  );
}