import axios from 'axios';
import React from 'react'
import categories from "./category";
const DicHeader = ({ 
    setCategory,
    category,
    word, 
    setWord,
    setMeanings
}) => {

    const handleChange = (e) => {
        setCategory(e.target.value);
        setWord("");
        setMeanings([]);
      };

    // const handleText = debounce((text) => {
    //     setWord(text);
    //   }, 500);

  return (
    <React.Fragment>
        <div className="container dic-header">
            <h1 className='mt-5'>DICTIONARY</h1>
            {/* <p>standard</p> */}
            <div className="text-center mt-5">
                <span className='font-dic' style={{fontSize: '40px', fontWeight: '100'}}>{word ? word : "Word Hunt"}</span>
            </div>
            <div className="row mt-5">
                <div className="col-6">
                    <input 
                        type="text" 
                        className="form-control search"
                        id="filled-basic"
                        placeholder="World" 
                        label="Search a Word"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />
                </div>
                <div className="col-6">
                    <select className="form-control"
                        lable="language"
                        value={category}
                        onChange={(e) => handleChange(e)}
                    >
                        {categories.map((option) => (
                            <option key={option.lable} value={option.lable}>{option.value}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default DicHeader