import {useRef, useState} from "react";

const FeelingEditor = (props) => {

    const {onCreate} = props;

    const authorInput = useRef();
    const contentTextarea = useRef();
    const [diary, setDiary]= useState({
        author: "",
        content: "",
        feeling: 1
    })
    const handleChangeDiary = (e) => {
        setDiary({
            ...diary,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitDiary = () => {
        console.log(diary, 'diary')
        if (diary.author.length < 1) {
            // focus
            authorInput.current.focus()
            return;
        }
        if (diary.content.length < 5) {
            // focus
            contentTextarea.current.focus()
            return;
        }

        onCreate(diary.author, diary.content, diary.feeling)
        alert("저장성공")
        setDiary({
            author: "",
            content: "",
            feeling: 1
        })
    }
    return (
        <div className="FeelingEditor">
            <h2>오늘 기분이 어때</h2>
            <div>
                <input ref={authorInput} name="author" type="text" value={diary.author} onChange={handleChangeDiary}/>
            </div>
            <div>
                <textarea ref={contentTextarea} name="content" cols="30" rows="10" value={diary.content} onChange={handleChangeDiary}></textarea>
            </div>
            <div>
                오늘의 감정점수는요? &nbsp;&nbsp;
                <select name="feeling" value={diary.feeling} onChange={handleChangeDiary}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmitDiary}>
                    내 마음속에 저장
                </button>
            </div>
        </div>
    )
}

export default FeelingEditor;