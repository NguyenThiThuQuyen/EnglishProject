import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HomeHeader2 from '../../../HomePage/HomeHeader2';
// import './Dictionary.scss';
import DicHeader from './DicHeader';
import Definitions from './Difinitions';
function Dictionary() {

    const [word, setWord] = useState("")
    const [meanings, setMeanings] = useState([])
    const [category, setCategory] = useState("en")
    const dictionaryApi = async() => {
        try{
            const data = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        );
        setMeanings(data.data)
        }catch (error){
            console.log(error)
        }
    };
    console.log(meanings);

    useEffect(() => {
        dictionaryApi();
        // eslint-disable-next-line
      }, [word, category]);

    return (
        <React.Fragment>
            <HomeHeader2 />
            <DicHeader 
                setWord={setWord}
                category={category}
                setCategory={setCategory}
                word={word}
                setMeanings={setMeanings}
            />
            {meanings && (
            <Definitions
                meanings={meanings}
                word={word}
                // LightTheme={LightTheme}
                category={category}
            />
        )}
        </React.Fragment>
  )
}

export default Dictionary