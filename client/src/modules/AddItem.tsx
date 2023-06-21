import React, {useState} from 'react'
import axios from 'axios';

const AddItem:React.FC = () => {
  interface ItemState {
    name: string;
    image: string;
    desc: string;
    price: string;
    collectorName: string;
  }
  
  const [itemState, setItemState] = useState<ItemState>({
    name: "",
    image: "",
    desc: "",
    price: "",
    collectorName: ""
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemState({
      ...itemState,
      [e.target.name]: value
    });
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/add-item', {
      name: itemState.name,
      image: itemState.image,
      desc: itemState.desc,
      price: itemState.price,
      collectorName: itemState.collectorName
    }).then(()=>{
      // Item Added 
      alert('Item Added');
  })
}

  return (
    <div className='add_item'>
      <form action="post" onSubmit={handleSubmit}>
        <label htmlFor="Name">Name:</label>
        <input 
        type="text" 
        name='name'
        value={itemState.name}
        onChange={handleChange}
        placeholder='Name' />
        <label htmlFor="Image">Image:</label>
        <input 
        type="text"
        name='image'
        value={itemState.image}
        onChange={handleChange}
        placeholder='Image Url' />
        <label htmlFor="Description">Description:</label>
        <input 
        type="text"
        name='desc'
        value={itemState.desc}
        onChange={handleChange}
        placeholder='Description...' />
        <label htmlFor="Price">Price:</label>
        <input 
        type="number"
        name='price'
        value={itemState.price}
        onChange={handleChange}
        placeholder='Price' />
        <label htmlFor="collectorName">Collector Name:</label>
        <input 
        type="text" 
        name='collectorName'
        value={itemState.collectorName}
        onChange={handleChange}
        placeholder='Collector' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddItem