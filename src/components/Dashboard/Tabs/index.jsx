import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material';
import "./style.css";
import Grid from '../Grid';
import List from '../List';


export default function Tabs({coins}) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme ({
    palette: {
        primary:
        {
            main: "#3a80e9"
        }
    }
  })

  const style = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1rem",
    fontWeight: 600,
    fontfamily: "",
    textTransform: "capitalize"
  }


  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
    
          <TabList onChange={handleChange}  variant="fullWidth">
            <Tab label="Grid" value="grid"  sx={style}/>
            <Tab label="List" value="list" sx={style}/>
          </TabList>

        <TabPanel value="grid">
            <div className='grid-flex'>
                {coins.map((coin,i)=>{
                    return (
                        <Grid coin={coin} key={i}/>
                    );
                })}
            </div>
        </TabPanel>
        <TabPanel value="list">
            <table className='list-table'>
            {coins.map((item,i)=>{
                    return (
                        <List coin={item} key={i} />
                    );
                })}
            </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
