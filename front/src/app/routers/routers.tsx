import { createBrowserRouter } from 'react-router';
import { Layout } from '../layout/Layout';
import {
  DashboardPage,
  TeamPage,
  ProjectDetailsPage
} from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true , Component: DashboardPage},
      { path: 'team', Component: TeamPage},
      { path: 'projects/:id', Component: ProjectDetailsPage },
    ]
  },
])