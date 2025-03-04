import Home from '../../component/feature/Home/Home'
import CreateProperty from '../../component/feature/Properties/Create/CreateProperty'
import Property from '../../component/feature/Properties/View/Property'
import Logout from '../../component/shared/Auth/Logout'
import Teams from '../../component/feature/Teams/Create/Teams'
import Community from '../../component/feature/Community/View/Community'
import CreateCommunity from '../../component/feature/Community/Create/CreateCommunity'
import News from '../../component/feature/News/View/News'
import CreateNews from '../../component/feature/News/Create/CreateNews'
import TeamList from '../../component/feature/Teams/View/TeamList'

const rootRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: 'property',
        element: <Property />
    },
    {
        path: 'create-property',
        element: <CreateProperty />
    },
    {
        path: 'create-property/:id',
        element: <CreateProperty />
    },
    {
        path: 'teams',
        element: <TeamList />
    },
    {
        path: 'create-teams',
        element: <Teams />
    },
    {
        path: 'edit-teams/:id',
        element: <Teams />
    },
    {
        path: 'community',
        element: <Community />
    },
    {
        path: 'create-community',
        element: <CreateCommunity />
    },
    {
        path: 'news',
        element: <News />
    },
    {
        path: 'create-news',
        element: <CreateNews />
    },
    {
        path: 'logout', 
        element: <Logout />
    }
]

export default rootRoutes