import { NavLink } from "react-router-dom";
// import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
// import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
// import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import './sideBar.css'
import { FaHome} from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
// import { MdPlaylistAdd ,FaHome} from "react-icons/fa";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";



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
        <BsFillBookmarkFill />
        <p className="nav-item-name">likes</p>
      </NavLink>
      <NavLink to="/savedvideos" activeClassName="active-link" className="sidebar-item">
        <BsBookmark />
        <p className="nav-item-name">History</p>
      </NavLink>
    </aside>
  );
}