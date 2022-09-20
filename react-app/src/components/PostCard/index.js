import { TiHeartOutline } from "react-icons/ti";
// import { useSelector } from "react-redux";
import "./PostCard.css"


//TO-DO: Rudy finish Post Card
const PostCard = ({ post }) => {

    return (
        <div className="outter-div-pc" /* outter main div container for single post */ >
            <div className="header-pc" >
                <div className="user-icon-pc">
                    <img className="user-img" src={ post.user.profile_img }/>
                </div>
                <div className="header-info">
                    <div>{ post.user.username }</div>
                    <div>{ post.location }</div>
                </div>
            </div>
            <div className="post-card-img-container" /* image display container */ >
                <img className="post-card-img" src={ post?.image_url } />
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
