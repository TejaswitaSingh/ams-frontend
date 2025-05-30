import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

/* ****Pages***** */
const Dashboard = lazy(() => import('../views/dashboard/Dashboard'))
const AdminManagement = lazy(() => import('../views/admin-manage/AdminManagement')) 
const TeacherManagement = lazy(() => import('../views/teacher-manage/TeacherManagement'))
const StudentManagement = lazy(() => import('../views/student-manage/StudentManagement'))
const ClassManagement = lazy(() => import('../views/class-manage/ClassManagement'))
const Error = lazy(() => import('../views/authentication/Error'));
const Register = lazy(() => import('../views/authentication/Register'));
const Login = lazy(() => import('../views/authentication/Login'));

const BasicTable = lazy(() => import("../views/tables/BasicTable"));
const ExAutoComplete = lazy(() =>
  import("../views/form-elements/ExAutoComplete")
);
const ExButton = lazy(() => import("../views/form-elements/ExButton"));
const ExCheckbox = lazy(() => import("../views/form-elements/ExCheckbox"));
const ExRadio = lazy(() => import("../views/form-elements/ExRadio"));
const ExSlider = lazy(() => import("../views/form-elements/ExSlider"));
const ExSwitch = lazy(() => import("../views/form-elements/ExSwitch"));
const FormLayouts = lazy(() => import("../views/form-layouts/FormLayouts"));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/admin-management', exact: true, element: <AdminManagement /> },
      { path: '/teacher-management', exact: true, element: <TeacherManagement /> },
      { path: '/student-management', exact: true, element: <StudentManagement /> },
      { path: '/class-management', exact: true, element: <ClassManagement /> },
      { path: "/tables/basic-table", element: <BasicTable /> },
      { path: "/form-layouts", element: <FormLayouts /> },
      // { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
      // { path: "/form-elements/button", element: <ExButton /> },
      // { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      // { path: "/form-elements/radio", element: <ExRadio /> },
      // { path: "/form-elements/slider", element: <ExSlider /> },
      // { path: "/form-elements/switch", element: <ExSwitch /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
