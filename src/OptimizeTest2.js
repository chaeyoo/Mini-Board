import React, {useEffect, useState} from "react";

// 1을 계속 set하면 count가 바뀌지 않았다고 감지하여 리렌더 x
const CounterA = React.memo(({count}) => {
    useEffect(() => {
        console.log(`CounterA Update-count: ${count}`)
    })
    return <div>{count}</div>
});

// 값이 같은 객체를 set하면 obj가 바뀌었다고 감지하여 리렌더 o
// 객체를 비교할 때는 주소를 비교
// areEqual를 쓰면 얕은 비교를 하지 않음
const CounterB = ({obj}) => {
    useEffect(() => {
        console.log(`CounterB Update-count: ${obj.count}`)
    })
    return <div>{obj.count}</div>
};

const areEqual = (prevProps, nextProps) => {
    return prevProps.obj.count === nextProps.obj.count;
}

const MemoizedCounterB = React.memo(CounterB, areEqual)
export default function OptimizeTest2() {

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1
    });
    return <div style={{ padding: 50 }}>
        <div>
            <h2>counter A</h2>
            <CounterA count={count}/>
            <button onClick={() => setCount(count)}>
                A button
            </button>
        </div>
        <div>
            <h2>counter B</h2>
            <MemoizedCounterB obj={obj}/>
            <button onClick={() => setObj({
                count: obj.count
            })}>
                B button
            </button>
        </div>
    </div>
}