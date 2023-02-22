import FeelingItem from "./FeelingItem";

const FeelingList = (props) => {
    const {list, onRemove, onUpdate} = props

    return (
        <div className="FeelingList">
            <h2>감정목록</h2>
            <h4>{list.length}개의 일기가 있습니다.</h4>
            <div>
                {list?.map((item) => (
                    <FeelingItem key={item.id} item={item} onRemove={onRemove} onUpdate={onUpdate}/>
                ))}
            </div>
        </div>
    )
}

FeelingList.defaultProps={
    list: []
}
export default FeelingList;