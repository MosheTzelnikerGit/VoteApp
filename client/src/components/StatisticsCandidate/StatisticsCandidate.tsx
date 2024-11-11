// CandidatesList.tsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCandidates } from "../../store/candidatesSlice";
import { RootState } from "../../store/store";
import "./StatisticsCandidate.css";

const CandidatesList: React.FC = () => {
  const dispatch: any = useDispatch();
  const { candidates, status, error } = useSelector((state: RootState) => state.candidates);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCandidates());
    }
  }, [status, dispatch]);

  return (
    <div className="candidates-list">
      <h2>Candidates</h2>
      {status === "loading" && <p>Loading candidates...</p>}
      {error && <p>Error: {error}</p>}
      <div className="candidates-container">
        {candidates.map(candidate => (
          <div key={candidate._id} className="candidate-card">
            <img src={candidate.image} alt={candidate.name} className="candidate-image" />
            <h3>{candidate.name}</h3>
            <p>Votes: {candidate.votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatesList;
