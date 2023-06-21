import React, {useState,useEffect} from 'react'

const Items = () => {
    const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>{message}</div>
  )
}

export default Items