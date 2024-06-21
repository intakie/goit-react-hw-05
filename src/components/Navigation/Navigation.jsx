import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const getLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={getLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={getLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
}
