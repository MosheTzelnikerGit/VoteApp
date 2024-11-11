import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

interface Candidate {
    _id: string;
    name: string;
    votes: number;
  }

function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  // שליפת מועמדים מהשרת
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/candidates`);
        setCandidates(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCandidates();
  }, []);

  // פונקציית הצבעה עבור מועמד
  const handleVote = async (candidateId : string) => {
    try {
      await axios.post(`${API_BASE_URL}/vote`, { id: candidateId });
      alert("Voted successfully!");
      // רענון רשימת המועמדים לאחר הצבעה
      const updatedCandidates = candidates.map(candidate =>
        candidate._id === candidateId
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      );
      setCandidates(updatedCandidates);
    } catch (error) {
      console.error(error);
      alert("Voting failed");
    }
  };

  return (
    <div>
      <h2>Election Candidates</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id}>
            {candidate.name} - Votes: {candidate.votes}
            <button onClick={() => handleVote(candidate._id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Candidates;
