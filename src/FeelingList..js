import FeelingItem from "./FeelingItem";
import {useContext} from "react";
import {FeelingStateContext} from "./App";

const FeelingList = () => {
    // const { list, onRemove, onUpdate } = props
    // const { onRemove, onUpdate } = props
    const list = useContext(FeelingStateContext)
    return (
        <div className="FeelingList">
            <h2>감정목록</h2>
            <h4>{list.length}개의 일기가 있습니다.</h4>
            <div>
                {list?.map((item) => (
                    // <FeelingItem key={item.id} item={item} onRemove={onRemove} onUpdate={onUpdate}/>
                    <FeelingItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

FeelingList.defaultProps={
    list: []
}
export default FeelingList;