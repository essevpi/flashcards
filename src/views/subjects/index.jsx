import React from 'react';

const Subjects = ({ data }) => {
  return (
    <div>
      <div>{data.map(subject => (
        <p key={subject.subject}>{subject.subject}</p>
      ))}</div>
    </div>
  );
};

export default Subjects;
