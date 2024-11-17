// src/pages/AssignmentView.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CodeCompiler from '../components/CodeCompiler';
import Cookies from 'js-cookie'

const AssignmentView = () => {
  const userId = Cookies.get('userId');
  const id = useParams();
  // console.log(id.assignmentId)
  return (
    <div>
      <CodeCompiler assignmentId={id.assignmentId} studentId={userId}/>
    </div>
  );
};

export default AssignmentView;