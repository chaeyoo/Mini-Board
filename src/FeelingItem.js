import React, {useContext, useEffect, useRef, useState} from "react";
import {FeelingDispatchContext} from "./App";

const FeelingItem = (props) => {
    // const {item, onRemove, onUpdate} = props;
    const {item} = props;
    const {onRemove, onUpdate} = useContext(FeelingDispatchContext);
    const [isEdit, setIsEdit] = useState(false);
    const [localContent, setLocalContent] = useState(item.content ? item.content : "");
    const localContentTextarea = useRef();
    const toggleIsEdit = () => {
        setIsEdit(!isEdit);
    }
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(item.content);
    }
    const handleDeleteDiary = () => {
        if (window.confirm(`${item.id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(item.id);
        }
    }
    const handleUpdateDiary = () => {
        if (localContent.length < 5) {
            localContentTextarea.current.focus();
            return;
        }
        if (window.confirm(`${item.id}번째 일기를 수정하시겠습니까?`)) {
            console.log(item.id,":::", localContent)
            onUpdate(item.id, localContent);
            toggleIsEdit();
        }
    }

    useEffect(() => {
        console.log(item.id + '번째 일기 렌더')
    })
    return (
        <div className="FeelingItem">
            <div className="info">
                <span>작성자: {item.author} | 감정 점수: {item.feeling}</span>
                <br/>
                <span className="date">{new Date(item.createdAt).toLocaleString()}</span>
            </div>
            <div className="content">
                {isEdit ? (
                    <>
                        <textarea ref={localContentTextarea} value={localContent} onChange={(e) => setLocalContent(e.target.value)}/>
                    </>
                    ) : (
                    <>
                        {item.content}
                    </>
                )}
            </div>
            {isEdit ? (
                <>
                    <button onClick={handleQuitEdit}>수정취소</button>
                    <button onClick={handleUpdateDiary}>수정완료</button>
                </>
            ) : (
                <>
                    <button onClick={handleDeleteDiary}>일기삭제</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            )}

        </div>
    )
}

export default React.memo(FeelingItem);