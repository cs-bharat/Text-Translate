import axios from "axios";
import { useEffect, useState } from "react";
import { conf } from "./config/conf";


function App() {
  // const [count, setCount] = useState(12)
  // function inc(){
  //   // count++;
  //   setCount(count + 1);
  //   console.log("clicked",count)
  // }

  const [text, setText] = useState("");
  const [inputText, setInputText] = useState("My name is Bharat and I am from India, also I speak hindi");
  const [data, setData] = useState(
    "My name is Bharat and I am from India, also I speak hindi"
  );

  // console.log(conf.api_key);
  const getData = (e) => {
    e.preventDefault();
    if (inputText) {
      setData(inputText);
    } else {
      return;
    }
  };

  const options = {
    method: "POST",
    url: "https://microsoft-translator-text.p.rapidapi.com/translate",
    params: {
      "to[0]": "hi",
      "api-version": "3.0",
      profanityAction: "NoAction",
      textType: "plain",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": `${conf.api_key}`,
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    data: [
      {
        Text: `${data}`,
      },
    ],
  };

  useEffect(() => {
    // (()=>{})()  IIFE
    (async () => {
      try {
        const res = await axios.request(options);
        const data = await res.data;

        setText(data[0].translations[0].text);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data]);

  return (

    <div className="min-h-screen min-w-screen] bg-gradient-to-r from-slate-900 to-slate-950 text-white p-2 ">
      <h1 className="text-[#C9ADA7] text-7xl shadow-md shadow-gray-800 text-center font-bold">
        Translate
      </h1>

      <div className="flex flex-col justify-center gap-10 max-w-7xl mx-auto">

        <div className="flex justify-center items-center flex-wrap mt-10 outline-none sm:gap-6 ">
            
            <div className="w-[600px] h-[400px] m-2 ">
              <textarea
                className="w-full relative h-full bg-transparent border-[1px] border-white/40 rounded-3xl p-4 
                shadow-lg  shadow-orange-200 "
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
           </div>

           <div className="w-[600px]  h-[400px] m-2">
              <p className=" shadow-lg w-full h-full relative shadow-orange-800 bg-transparent border-[1px] border-white/40 rounded-3xl p-4
               ">
               {text}
               </p>  
            </div>
 
        </div>

        <button onClick={getData} className=" bg-gradient-to-r from-orange-400 to-orange-700 font-semibold py-2 px-4  rounded-3xl  text-xl w-full 
       ">Translate</button>
      </div>

    </div>
  );
}

export default App;
