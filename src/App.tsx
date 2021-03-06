import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import DiamondIcon from '@mui/icons-material/DiamondOutlined';
import Box from '@mui/material/Box';
import CalcPriceForm from './components/CalcPriceForm';
import { Button } from '@mui/material';
import ShowSimilarsPopup from './components/ShowSimilarsPopup';

enum MainView {
  LOGO,
  CALC_PRICE,
  SHOW_PRICE,
  SHOW_SIMILAR
}

const LogoBoxStyle = {
  marginBottom: "10vh",
  width: "50vh",
  height: "50vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "0.5vh solid #84b5e9",
  borderRadius: "10vh",
}

function App() {
  const [mainView, setMainView] = useState(MainView.LOGO);
  const [submitiedDiamond, setSubmitiedDiamond] = useState({ id: "", price: -1 });

  const calcFormAfterSubmitCallback = useCallback(
    (diamondId: string, price: number) => {
      setSubmitiedDiamond({ id: diamondId, price })
    }, []
  )

  useEffect(() => {
    setTimeout(() => {
      setMainView(MainView.CALC_PRICE);
    }, 2000)
  }, [])

  useEffect(() => {
    if (submitiedDiamond.price > -1) {
      setMainView(MainView.SHOW_PRICE);
    }
  }, [submitiedDiamond])


  return (
    <div className="App">
      {mainView === MainView.LOGO &&
        <div className='Logo'>
          <Box sx={LogoBoxStyle}>
            <DiamondIcon color='primary' sx={{ fontSize: 150 }} />
          </Box>
        </div>
      }
      {mainView === MainView.CALC_PRICE &&
        <CalcPriceForm afterDone={
          calcFormAfterSubmitCallback
        } />
      }
      {
        mainView === MainView.SHOW_PRICE &&
        <div className='PriceResult'>
          <Box sx={LogoBoxStyle}>
            <div className='PriceBox'>
              <div className='PriceLabelAndValue'>
                <div className='PriceLabel'>Estimated Price</div>
                <div className='PriceValue'>{submitiedDiamond.price + "$"}</div>
                <DiamondIcon color='secondary' sx={{ fontSize: 100 }} />
              </div>
              <div className='PriceButtons'>
                <Button
                  variant="contained"
                  sx={{ mb: 1, width: "90%" }}
                  onClick={() => {
                    setMainView(MainView.SHOW_SIMILAR);
                  }}>
                  show similar diamonds
                </Button>
                <Button
                  variant="contained"
                  sx={{ mb: 2, width: "90%" }}
                  onClick={() => {
                    setMainView(MainView.CALC_PRICE);
                  }}>
                  Re Estimate Price
                </Button>
              </div>
            </div>
          </Box>
        </div>
      }
      {
        mainView === MainView.SHOW_SIMILAR &&
        <ShowSimilarsPopup
          diamondId={submitiedDiamond.id}
          onBackClick={() => {
            setMainView(MainView.SHOW_PRICE)
          }}
        />
      }

    </div>
  );
}

export default App;
