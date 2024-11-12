import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { fetchCandidates, voteCandidate } from "../../store/candidatesSlice";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import "./StatisticsCandidate.css";

const CandidatesList: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate(); 
  const { candidates, status, error } = useSelector((state: RootState) => state.candidates);
  const { user } = useSelector((state: RootState) => state.user);

  

  const handleVote = async (candidateId: string) => {
    try {
      // שלח את הפעולה האסינכרונית בעזרת dispatch
      await dispatch(voteCandidate(candidateId));
    } catch (error) {
      console.error("Error voting for candidate", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCandidates());
    }
  }, [status, dispatch]);

  return (
    <div className="candidates-list">
      <header className="header">
        <h2>Candidates</h2>
      {user?.isAdmin && (<Link to="/statistics"><button className="statistics-btn">Statistics</button></Link>)}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <div className="candidates-container">
        {candidates.map(candidate => (
          <div key={candidate._id} className="candidate-card">
            <img src={candidate.image} alt={candidate.name} className="candidate-image" />
            <h3>{candidate.name}</h3>
            <p>Votes: {candidate.votes}</p>
            <button onClick={() => handleVote(candidate._id)}>Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatesList;
