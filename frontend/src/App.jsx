import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
// import { Home } from './components/Home';
import HomePage from './components/HomePage';
import { Signup } from './components/Signup';
// import SignIn from './components/Signin';
import SignIn from './components/SignIn';
import Assignments from './components/Assignments';
import Classrooms from './components/ui/Classrooms';
import Layout from './components/Layout';
import AssignmentView from './components/AssignmentView';
import ClassroomAssignments from './components/ClassroomAssignments';
import TeacherClassrooms from './components/TeacherClassrooms';
import TeacherAssignments from './components/TeacherAssignments';
import AssignmentSubmissions from './components/AssignmentSubmissions';

const router = createBrowserRouter(
  [
    {
      path : '/',
      element : 
        <div>
          <HomePage/>
        </div>
    },
    {
      path : '/login',
      element : <SignIn/>
    },
    {
      path : '/signup',
      element : <Signup/>
    },
    {
      path : '/admin/classrooms',
      element : 
       <div>
        <Layout/>
        <TeacherClassrooms/>
       </div>
    },
    {
      path : '/admin/assignments/:id',
      element : 
        <div> 
          <Layout/>
          <TeacherAssignments/>
        </div>
    },
    {
      path : '/assignments',
      element : 
        <div>
          <Layout/>
          <Assignments/>
        </div>
    },
    // {
    //   path : '/assignment/id',
    //   element : <AssignmentView/>
    // },
    {
      path : '/classrooms',
      element : 
        <div>
          <Layout/>
          <Classrooms/>
        </div>
    },
    {
      path : '/classroom/:classId',
      element :
        <div>
          <Layout/>
          <ClassroomAssignments/>
        </div>
    },
    {
      path : '/assignment/:assignmentId',
      element :
        <AssignmentView/>
    },
    { //remove
      path : '/assignments/new/:id',
      element : 
        <div> 
          <Layout/>
          <TeacherAssignments/>
        </div>
    },
    {
      path : '/submissions/:assignmentId',
      element : 
        <div>
          <Layout/>
          <AssignmentSubmissions/>
        </div>
    }
  ]
)

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
