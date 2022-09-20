import './FollowsList.css'
import '../../index.css'
// import { NavLink } from 'react-router-dom';


const FollowsList = ({ currUser }) => {

    const developers = [
        {
            name: 'David Ting',
            pic: 'https://avatars.githubusercontent.com/u/101853690?s=400&u=a7e10d2fbf72be60ea52c673f6d42487603651c6&v=4',
            linkedIn: 'https://www.linkedin.com/in/da-wei-ting-cpa-a929b5102/',
            gitHubLink: 'https://github.com/dwting0322'
        },
        {
            name: 'Alec Venida',
            pic: '',
            linkedIn: 'https://www.linkedin.com/in/alec-venida-66793979',
            gitHubLink: 'https://github.com/avenida714'
        },
        {
            name: 'Ray Henry',
            pic: '',
            linkedIn: '',
            gitHubLink: 'https://github.com/RayC206'
        },
        {
            name: 'Rudy Nguyen',
            pic: '',
            linkedIn: 'https://www.linkedin.com/in/rudy-nguyen-454b0a242/',
            gitHubLink: 'https://github.com/rudyn2010'
        }
    ];

    const displayDevs = developers.map((dev) => (
        <div className='user-follow-header'>
            <div className='user-img-fp'>
                <img className="img circle" src={ dev?.pic || "https://i.stack.imgur.com/6M513.png" } />
            </div>
            <div>
                <div>{ dev.name }</div>
                <div className='our-links'>
                    <a className="link lightgray" href={dev.gitHubLink}>GitHub</a>
                    <a className="link lightgray" href={dev.linkedIn}>LinkedIn</a>
                </div>
            </div>
        </div>
    ));

    return (
        <div className='follows-outer-container'>
            <div className='user-follow-header'>
                <div className='user-img-fp'>
                    <img className="img circle" src={ currUser.profile_img }/>
                </div>
                <div>
                    <div>{ currUser.username }</div>
                    <div className='lightgray'>{ currUser.name }</div>
                </div>
            </div>
            <div className='suggestions-divider darkgray'>
                Follow the Developers
            </div>
            <div className='suggestions-list'>
                {displayDevs}
            </div>
        </div>
    )
};

export default FollowsList;
