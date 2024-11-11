import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setCandidates } from '../../store/candidatesSlice';  // ודא שה-import נכון

const CandidateList = () => {
  const dispatch = useDispatch();
  const candidates = useSelector((state: RootState) => state.candidates.candidates);

  useEffect(() => {
    // קוד להורדת המועמדים משרת חיצוני (במקרה זה מדוגמה)
    const fetchCandidates = async () => {
      const response = await fetch('http://localhost:5000/api/candidates');  // כתובת ה-API שלך
      const data = await response.json();
      dispatch(setCandidates(data));  // עדכון ה-store עם המועמדים
    };

    fetchCandidates();
  }, [dispatch]);

  return (
    <div>
      <h1>Candidate List</h1>
      <ul>
        {candidates.length === 0 ? (
          <p>No candidates available</p>  // אם אין מועמדים
        ) : (
          candidates.map((candidate) => (
            <li key={candidate.id}>
              {candidate.name} - {candidate.party}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CandidateList;
