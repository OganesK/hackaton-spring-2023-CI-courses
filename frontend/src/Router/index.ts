import LogInPage from '../Pages/Auth/LogInPage';
import SignUpPage from '../Pages/Auth/SignUpPage';

import Events from '../Pages/Events/Events';
import Home from '../Pages/Home/Home';
import MessagesPage from '../Pages/Messages/MessagesPage';

import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import Projects from '../Pages/Projects/Projects';


import NewsPage from '../Pages/NewsPage/NewsPage';

import ProjectPage from '../Pages/SingleProjectPage/ProjectPage';

import Tests from '../Pages/Test/Tests';

export const publicRoutes = [
  { path: '/home', component: Home, exact: true },
  { path: '/projects', component: Projects, exact: true },
  { path: '/events', component: Events, exact: true },
  { path: '/news', component: NewsPage, exact: true },
  { path: '/login', component: LogInPage, exact: true },
  { path: '/projects/project/:projectId', component: ProjectPage, exact: true },
  { path: '/signup', component: SignUpPage, exact: true },
  { path: '/profile/:profileId', component: ProfilePage, exact: true },
  { path: '/messages', component: MessagesPage, exact: true },
  { path: '/messages/:groupId', component: MessagesPage, exact: true },
  { path: '/tests', component: Tests, exact: true },
  // { path: '/tests/:testId', component: test, exact: true },
];

export const privateRoutes = [
  // { path: '/messages', component: MessagesPage, exact: true },
  // { path: '/messages/:groupId', component: MessagesPage, exact: true },
];
