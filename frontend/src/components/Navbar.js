import {Link, useLocation} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'

const Navbar=() =>{
    const {logout} = useLogout()
    const { user } = useAuthContext()
    const location = useLocation();

    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className="container">
            <Link to="/">
                <h1>Habit Tracker</h1>
            </Link>

            <nav>
                {user && (
                    <div>
                        <span style={{ marginRight: '10px' }}>{user.email} </span>
                        {location.pathname === '/tags' ? (
                            <Link to="/">
                                <button style={{ marginRight: '10px' }}>Home Page</button>
                            </Link>
                        ) : (
                            <Link to="/tags">
                                <button style={{ marginRight: '10px' }}>Popular Tags</button>
                            </Link>
                        )}
                        <button onClick={handleClick}>Log out</button>
                    </div>)}
                {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                )} 
            </nav>
            </div>
        </header>
    )
}

export default Navbar