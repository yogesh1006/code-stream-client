// export default  { LikeProvider, useLikedVideos } from "./like-context";
// export default { PlaylistProvider, usePlaylist } from "./playlist-context";
// export default { SavedVideosProvider, useSavedVideos } from "./saved-context";
// export default { AuthProvider, useAuth } from "./authContext";
// export default { VideosProvider, useVideos } from "./videos-context";

import   { useLikedVideos } from "./like-context";
import { usePlaylist } from "./playlist-context";
import { useSavedVideos } from "./saved-context";
import { useAuth } from "./authContext";
import { useVideos } from "./videos-context";

export {
    useAuth,
    useLikedVideos,
    usePlaylist,
    useSavedVideos,
    useVideos
}