import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AnchorTemporaryDrawer() {
  const [open, setopen] = useState(false);




  return (
    <div>

      <IconButton onClick={() => setopen(true)}>
        <WidgetsRoundedIcon className='link' />
      </IconButton>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={() => setopen(false)}
      >
        <div className='drawer-div'>
        <Link to='/'>
          <p className='link'>Home</p>
        </Link>
        <Link to='/watchlist'>
          <p className='link'>Watchlist</p>
        </Link>
          <Link to='/dashboard'>
            <p className='link'>Dashboard</p>
          </Link>
        </div>
      </Drawer>

    </div>
  );
}
