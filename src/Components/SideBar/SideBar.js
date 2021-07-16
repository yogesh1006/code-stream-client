import { NavLink } from "react-router-dom";
import './sideBar.css'
import { FaHome} from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { BsFillBookmarkFill} from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";



export  function SideBar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" activeClassName="active-link" className="sidebar-item" exact>
        <FaHome />
        <p className="nav-item-name">Home</p>
      </NavLink>
      <NavLink
        to="/playlists"
        activeClassName="active-link"
        className="sidebar-item"
      >
        <MdPlaylistAdd />
        <p className="nav-item-name">Playlist</p>
      </NavLink>
      <NavLink to="/likedvideos" activeClassName="active-link" className="sidebar-item">
        <AiFillLike/>
        <p className="nav-item-name">likes</p>
      </NavLink>
      <NavLink to="/savedvideos" activeClassName="active-link" className="sidebar-item">
        <BsFillBookmarkFill />
        <p className="nav-item-name">Saved Videos</p>
      </NavLink>
    </aside>
  );
}