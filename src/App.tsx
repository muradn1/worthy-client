import { useEffect, useState } from 'react';
import './App.scss';
import DiamondIcon from '@mui/icons-material/DiamondOutlined';
import Box from '@mui/material/Box';
import CalcPriceForm from './components/CalcPriceForm';

enum MainView {
  LOGO,
  CALC_PRICE,
  SHOW_PRICE,
  SHOW_SIMILAR
}

function App() {
  const [mainView, setMainView] = useState(MainView.LOGO);
  const [submitiedDiamond, setSubmitiedDiamond] = useState({ id: "", price: -1 });
  useEffect(() => {
    setTimeout(() => {
      setMainView(MainView.CALC_PRICE);
    }, 2000)
  }, [])
  
  useEffect(() => {
    if(submitiedDiamond.price>-1){
      setMainView(MainView.SHOW_PRICE);
    }
  }, [submitiedDiamond])
  

  return (
    <div className="App">
      {mainView === MainView.LOGO &&
        <div className='Logo'>
          <Box sx={{
            width: "30%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "3px solid #84b5e9",
            borderRadius: "122px",
          }}>
            <DiamondIcon color='primary' sx={{ fontSize: 150 }} />
          </Box>
        </div>
      }
      {mainView === MainView.CALC_PRICE &&
        <CalcPriceForm afterDone={
          (diamondId:string, price:number) => {
            setSubmitiedDiamond({id:diamondId,price})
          }
        } />
      }
      {
        mainView === MainView.SHOW_PRICE &&
        <div>{submitiedDiamond.price}</div>
      }

    </div>
  );
}

export default App;
