import "./PostCard.css"

//TO-DO: Rudy finish Post Card
const PostCard = ({ post }) => {

    return (
        <div className="" /* outter main div container for single post */ >
            <div className="" /* profile image / name */ >
                <div>{/* user profile image */}</div>
                <p>{ post.owner_id }</p>
            </div>
            <div className="" /* image display container */ >
                {/* image here */}
            </div>
            <div>
                <button>Like Button</button>
                <button>Comment Button</button>
            </div>
            <div className="" /* caption container */ >
                <p>{ post.caption }</p>
            </div>
            <div>
                {/* comments display go here */}
            </div>
            <div className="" /* comment text area */ >
                <div className="">
                    {/* text area */}
                </div>
                <button>Post</button>
            </div>
        </div>
    )
};

export default PostCard;
