import './App.css';
import FeelingEditor from "./FeelingEditor";
import FeelingList from "./FeelingList.";
import {useEffect, useRef, useState} from "react";
// https://jsonplaceholder.typicode.com/comments
function App() {
    const [list, setList] = useState([]);

    const feelingId = useRef(1);
    const onCreate = (author, content, feeling) => {
        const createdAt = new Date().getTime();
        const newItem = {
            id: feelingId.current,
            author,
            content,
            feeling,
            createdAt,
        }
        feelingId.current += 1;
        setList([newItem, ...list])
    }
    
    const onRemove = (idToDelete) => {
        setList(list.filter((el) => el.id !== idToDelete))
    }

    const onUpdate = (idToUpdate, updatedContent) => {
        setList(
            list.map((val) =>
                val.id === idToUpdate ? {...val, content: updatedContent} : val
            )
        )
    }

    const getData = async() => {

    }
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
    }, [])
  return (
    <div className="App">
        <FeelingEditor onCreate={onCreate}/>
        <FeelingList list={list} onRemove={onRemove} onUpdate={onUpdate}/>
    </div>
  );
}

export default App;
