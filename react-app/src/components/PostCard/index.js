import { TiHeartOutline } from "react-icons/ti";
import { useHistory } from "react-router-dom";
import "./PostCard.css"
import '../../index.css'


//TO-DO: Rudy finish Post Card
const PostCard = ({ post }) => {
    const history = useHistory();

    const usersProfilePage = () => {
        let path = `/profile/${post.owner_id}`;
        history.push(path);
      };


    return (
        <div className="outter-div-pc" /* outter main div container for single post */ >
            <div className="header-pc" >
                <div className="user-icon-pc">
                    <img className="img circle" src={ post.user.profile_img }/>
                </div>
                <div onClick={usersProfilePage} className="header-info">
                    <div>{ post.user.username }</div>
                    <div>{ post.location }</div>
                </div>
            </div>
            <div className="post-card-img-container" /* image display container */ >
                <img className="img" src={ post?.image_url } />
            </div>
            <div>
                <TiHeartOutline className="heart-pc" />
            </div>
            <div className="caption-pc" /* caption container */ >
                <div>{ post.user.username }</div>
                <div>{ post.caption }</div>
            </div>
            <div className="comment-display-pc">
                Comment's go here!
            </div>
            <div className="leave-comment-pc" /* comment text area */ >
            </div>
        </div>
    )
};

export default PostCard;
