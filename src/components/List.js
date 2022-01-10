import {NavLink} from 'react-router-dom';


const ListItem = ({link,item}) => {
    return (
        <div className='list_container'>
            <div className='list_wrapper'>
                <li><NavLink  style={{textDecoration:'none'}} to={link}>{item}</NavLink></li>
            </div>
        </div>
    )
}

export default ListItem;