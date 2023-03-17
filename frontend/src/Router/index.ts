import LogInPage from '../Pages/Auth/LogInPage';
import SignUpPage from '../Pages/Auth/SignUpPage';
import CompanyPage from '../Pages/Company/CompanyPage';
import Events from '../Pages/Events/Events';
import Home from '../Pages/Home/Home';
import MessagesPage from '../Pages/Messages/MessagesPage';
import ModerationPage from '../Pages/ModerationPage/ModerationPage';
import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import Projects from '../Pages/Projects/Projects';
import CrowdfundsPage from '../Pages/Crowdfunds/CrowdfundsPage';
import Resources from '../Pages/Resources/Resources';
import NewsPage from '../Pages/NewsPage/NewsPage';
import OffersPage from '../Pages/Offers/OffersPage';
import ProjectPage from '../Pages/SingleProjectPage/ProjectPage';

export const publicRoutes = [
  { path: '/home', component: Home, exact: true },
  { path: '/projects', component: Projects, exact: true },
  { path: '/crowdfunds', component: CrowdfundsPage, exact: true },
  { path: '/events', component: Events, exact: true },
  { path: '/resources', component: Resources, exact: true },
  { path: '/ads', component: OffersPage, exact: true },
  { path: '/news', component: NewsPage, exact: true },
  { path: '/login', component: LogInPage, exact: true },
  { path: '/projects/project/:projectId', component: ProjectPage, exact: true },
  { path: '/signup', component: SignUpPage, exact: true },
  { path: '/profile/:profileId', component: ProfilePage, exact: true },
  { path: '/company/:companyId', component: CompanyPage, exact: true },
];

export const privateRoutes = [
  { path: '/moderate', component: ModerationPage, exact: true },
  { path: '/messages', component: MessagesPage, exact: true },
  { path: '/messages/:groupId', component: MessagesPage, exact: true },
];
