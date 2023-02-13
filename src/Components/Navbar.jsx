import {Link} from 'react-router-dom';
import reactLogo from '../assets/react.svg'

export default function Navbar({hooks}) {
    return (
        <>
            <img src={reactLogo} className="logo react" alt="React logo" />
            <ul className='menu'>
                {
                    hooks.map(hook => (
                        <li className='menu-item'>
                            <Link key={hook} to={`/${hook}`} className='link'>{hook}</Link>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}