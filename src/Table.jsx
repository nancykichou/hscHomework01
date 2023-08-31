import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function TableContext(){
  const [jsonData, setJsonData] = useState([]);
  const [add_production_name, setAdd_production_name] = useState("");
  const [add_describe, setAdd_describe] = useState("");
  const [add_prices, setAdd_prices] = useState("");
  const [add_instorage, setAdd_instorage] = useState("");

  useEffect(() => {
    fetch('./database.json')  // 注意路徑是相對於 public 資料夾的
      .then(response => response.json())
      .then(data => setJsonData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  //const tableStyleRight = { textAlign: 'right' }
  const tableStyleLeft = { textAlign: 'left' }
  const handleButtonClick = (item, type) => {
    const updatedData = fetchInstorage(jsonData, item, type);
    setJsonData(updatedData);
  };
  const handleChange = (e) => {
    const {name, value} = e.target;
    switch(name){
      case 'add_production_name':
        setAdd_production_name(value);
        break;
      case 'add_describe':
        setAdd_describe(value);
        break;
      case 'add_prices':
        setAdd_prices(value);
        break;
      case 'add_instorage':
        setAdd_instorage(value);
        break;
      default:
        break;
    }
  }
  const submitAdd = (event) => {
    event.preventDefault();
    const newDrinks = [...jsonData];
    const newDrink = { "id": null,
    "production_name": null,
    "describe": null,
    "prices": null,
    "instorage": null};
    newDrink.id = newDrinks.length + 1;
    newDrink.production_name = add_production_name;
    newDrink.describe = add_describe;
    newDrink.prices = add_prices;
    newDrink.instorage = add_instorage;
    newDrinks.push(newDrink);
    console.log(newDrinks);
    setJsonData(newDrinks);
  }

  return(<>
    <table className='table table-striped table-bordered dt-responsive nowrap vertical-align-center mx-5 w-50'>
      <thead>
        <tr>
          <th className='col'>品名</th>
          <th className='col'>描述</th>
          <th className='col text-center'>價格</th>
          <th className='col text-center'>庫存</th>
        </tr>
      </thead>
      <tbody>
        { jsonData.map((item) => (
          <tr key={item.id}>
            <td style={tableStyleLeft}>{item.production_name}</td>
            <td style={tableStyleLeft}>{item.describe}</td>
            <td className='text-center' >{item.prices}</td>
            <td className='text-center'>
              <button id='minus' className='btn btn-danger' onClick = {()=>handleButtonClick(item,"minus")}>
                <FontAwesomeIcon icon={faMinus} /></button>
                {"  " + item.instorage + "  "}
              <button id ='puls' className='btn btn-success' onClick = {()=>handleButtonClick(item,"plus")}>
                <FontAwesomeIcon icon={faPlus} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className='row w-50'>
      <div className="col-12 justify-content-center d-flex mb-3 mx-5">
        <div className='col-6'>
          <label htmlFor="add_production_name" className='me-3'>產品名稱</label>
          <input type="text" id="add_production_name" name="add_production_name" 
          value={add_production_name} onChange={(e)=>handleChange(e)}/>
        </div>
        <div className='col-6'>
          <label htmlFor="add_describe" className='me-3'>產品描述</label>
          <input type="text" id="add_describe" name="add_describe" 
          value={add_describe} onChange={(e)=>handleChange(e)}/>
        </div>
      </div>
      <div className="col-12 justify-content-center d-flex mb-3 mx-5">
        <div className='col-6'>
          <label htmlFor="add_prices" className='me-3'>產品價格</label>
          <input type="text" id="add_prices" name="add_prices" 
          value={add_prices} onChange={(e)=>handleChange(e)}/>
        </div>
        <div className='col-6'>
          <label htmlFor="add_instorage" className='me-3'>產品庫存</label>
          <input type="text" id="add_instorage" name="add_instorage" 
          value={add_instorage} onChange={(e)=>handleChange(e)}/>
        </div>
      </div>
      <div className="col-12 justify-content-start d-flex ms-5">
        <button type="submit" id='add_production' className='btn btn-danger col-4' 
        onClick = {(e)=>submitAdd(e)}>
        增加品項
        </button>
      </div>
    </div>
  </>)
}

function fetchInstorage(data, item, type) {
  const newDrinks = [...data];
  newDrinks.forEach((element) => {
    if (element.id === item.id) 
      if((type === "minus") && (element.instorage > 0))
        element.instorage--;
      else if(type === "plus")
        element.instorage++;
  });
  return newDrinks;
}

export default TableContext;