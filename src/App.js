import './App.css';
import FeelingEditor from "./FeelingEditor";
import FeelingList from "./FeelingList.";
import React, {useCallback, useEffect, useMemo, useReducer, useRef} from "react";

// state: 상태변화 일으키기 직전 상태
// action: 어떤 상태 변화를 일으켜야 하는지 정보
const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            return action.data
        }
            break;
        case 'CREATE':
            const createdAt = new Date().getTime();
            const newItem = {
                ...action.data, createdAt
            }
            return [newItem, ...state]
            break;
        case 'REMOVE':
            return state.filter((el) => el.id !== action.idToDelete)
            break;
        case 'EDIT':
            return state.map((val) => val.id === action.idToUpdate ? {...val, content: action.updatedContent} : val)
            break;
        default:
            return state;

    }
}

export const FeelingStateContext = React.createContext();
export const FeelingDispatchContext = React.createContext();
function App() {
    // const [list, setList] = useState([]);
    // reducer : 상태 변화를 처리하는 함수
    const [list, dispatch] = useReducer(reducer, []);
    const feelingId = useRef(1);
    const onCreate = useCallback((author, content, feeling) => {
        dispatch({
            type: "CREATE", data: {
                id: feelingId.current, author, content, feeling,
            }
        })

        // const createdAt = new Date().getTime();
        // const newItem = {
        //     id: feelingId.current,
        //     author,
        //     content,
        //     feeling,
        //     createdAt,
        // }
        feelingId.current += 1;
        // setList((list) => [newItem, ...list])
    }, []);

    const onRemove = useCallback((idToDelete) => {
        dispatch({
            type: 'REMOVE', idToDelete
        })
        // setList(list => list.filter((el) => el.id !== idToDelete))
    }, [])

    const onUpdate = useCallback((idToUpdate, updatedContent) => {
        console.log(idToUpdate, ":::", updatedContent)
        dispatch({
            type: 'EDIT', idToUpdate, updatedContent
        })
        // setList((list) =>
        //     list.map((val) =>
        //         val.id === idToUpdate ? {...val, content: updatedContent} : val
        //     )
        // )
    }, [])

    // App 컴포넌트가 재생성 될 때, 아래 함수들이 재생성 되지 않도록 useMemo로 묶어주기
    const memoizedDispatches = useMemo(() => {
        return {onCreate, onRemove, onUpdate}
    }, [])
    useEffect(() => {
        async function fetchData() {
            const result = await fetch(`https://jsonplaceholder.typicode.com/comments`).then((res) => res.json())
            // console.log(result)
            const initData = result.slice(0, 20).map((v) => {
                return {
                    author: v.email,
                    content: v.body,
                    feeling: Math.floor(Math.random() * 5) + 1,
                    createdAt: new Date().getTime(),
                    id: feelingId.current++,
                }
            });
            // console.log(initData)
            dispatch({
                type: 'INIT', data: initData
            })
            // setList(initData)
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

    const {goodCnt, badCnt, goodRatio} = getDiaryAnalysis;

    return (
        <FeelingStateContext.Provider value={list}>
            <FeelingDispatchContext.Provider value={memoizedDispatches}>
                <div className="App">
                    {/*<OptimizeTest />*/}
                    {/*<OptimizeTest2 />*/}
                    {/*<FeelingEditor onCreate={onCreate}/>*/}
                    <FeelingEditor />
                    <div>전체일기 수: {list.length}</div>
                    <div>좋은 날: {goodCnt} (비율: {goodRatio}%)</div>
                    <div>나쁜 날: {badCnt}</div>
                    {/*<FeelingList list={list} onRemove={onRemove} onUpdate={onUpdate}/>*/}
                    {/*<FeelingList onRemove={onRemove} onUpdate={onUpdate}/>*/}
                    <FeelingList />
                </div>
            </FeelingDispatchContext.Provider>
        </FeelingStateContext.Provider>
    );

}

export default App;
