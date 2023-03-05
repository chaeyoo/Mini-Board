import './App.css';
import FeelingEditor from "./FeelingEditor";
import FeelingList from "./FeelingList.";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import OptimizeTest from "./OptimizeTest";
import OptimizeTest2 from "./OptimizeTest2";

function App() {
    const [list, setList] = useState([]);

    const feelingId = useRef(1);
    const onCreate = useCallback((author, content, feeling) => {
        const createdAt = new Date().getTime();
        const newItem = {
            id: feelingId.current,
            author,
            content,
            feeling,
            createdAt,
        }
        feelingId.current += 1;
        setList((list) => [newItem, ...list])
    },[]);

    const onRemove = useCallback((idToDelete) => {
        setList(list => list.filter((el) => el.id !== idToDelete))
    }, [])

    const onUpdate = useCallback((idToUpdate, updatedContent) => {
        setList((list) =>
            list.map((val) =>
                val.id === idToUpdate ? {...val, content: updatedContent} : val
            )
        )
    }, [])

    useEffect(() => {
        async function fetchData() {
            const result = await fetch(
                `https://jsonplaceholder.typicode.com/comments`
            ).then((res) => res.json())
            console.log(result)
            const initData = result.slice(0, 20).map((v) => {
                return {
                    author: v.email,
                    content: v.body,
                    feeling: Math.floor(Math.random() * 5) + 1,
                    createdAt: new Date().getTime(),
                    id: feelingId.current ++,
                }
            });
            setList(initData)
        }
        fetchData();
    }, []);

    // 일기 데이터의 길이가 변화하는 경우 말고는 통계 계산을 다시 할 필요가 없음
    // memoization 기법 사용으로 연산 최적화!!
    // useMemo로 memoization 하고 싶은 함수를 감싼다.
    // useMemo는 콜백함수가 리턴하는 "값"을 리턴을 한다. 함수가 아님!!
    const getDiaryAnalysis = useMemo(() => {
        // console.log("일기 분석 시작") // 2번 호출
        const goodCnt = list.filter((el) => el.feeling >= 3).length;
        const badCnt = (list.length - goodCnt);
        const goodRatio = (goodCnt / list.length) * 100;
        return {goodCnt, badCnt, goodRatio};
    }, [list.length]);

    const { goodCnt, badCnt, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
        {/*<OptimizeTest />*/}
        {/*<OptimizeTest2 />*/}
        <FeelingEditor onCreate={onCreate}/>
        <div>전체일기 수: {list.length}</div>
        <div>좋은 날: {goodCnt} (비율: {goodRatio}%)</div>
        <div>나쁜 날: {badCnt}</div>
        <FeelingList list={list} onRemove={onRemove} onUpdate={onUpdate}/>
    </div>
  );
}

export default App;
