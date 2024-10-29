
const ItemUser = (props) =>{
    const {data} = props;
    return <div className="item-user">
        <div className="avatar">
            <img src={data.avatarName} alt="avatar" />
        </div>
        <span>{data.name}</span>
    </div>
}

export default ItemUser;