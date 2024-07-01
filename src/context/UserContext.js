import { createContext } from 'react';

const UserContext = createContext({
    user: { name: '', isLoggedIn: false, token: '',
    setUser: () => {}
    }
});

export default UserContext;