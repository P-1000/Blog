import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {CiMenuKebab} from 'react-icons/ci'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';



export default function BasicPopover(props) {
  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
      headers: { Authorization: `Bearer ${tok}` }
  }

  const post_id = props 
  const blog_id = post_id.post_id
  const navigate = useNavigate()
    const theme = createTheme({
        palette: {
          primary: {
            main: '#0B3954', // change this to your desired color
          },
          secondary: {
            main: '#0B3954', // change this to your desired color
          },
          focus: {
            main: '#0B3954', // change this to your desired focus color
          },
        },
      });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  async function deletePost(id){
   try {
    const del_ = await axios.delete(`http://localhost:5173/api/blogs/delete/${id}` , config)
    toast.success('Post Deleted Successfully')
    setTimeout(() => {
      navigate('/home')
    }
    , 1000);
   } catch (error) {
      console.log(error)
   }
  }

  return (
    <ThemeProvider theme={theme}>
     <Toaster />
    <div>
      <Button style={{ backgroundColor: 'transparent', color: 'inherit' , outline:'none' }} aria-describedby={id}  onClick={handleClick}>
        <CiMenuKebab className='text-xl'/>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography>
        <div className='flex flex-col  text-center '>
                <button className='text-sm font-semibold text-primary hover:bg-slate-300 p-1 mt-3  px-4'>Share</button>
                <button className='text-sm font-semibold text-primary hover:bg-slate-300 p-1 pb-1 px-4'>Report</button>
                <button 
                onClick={()=>{navigate(`/Edit/${blog_id}`)}}
                className='text-sm font-semibold text-primary hover:bg-slate-300 p-1 pb-1 px-4'>Edit</button>
                <button 
                onClick={()=>deletePost(blog_id)}
                className='text-sm font-semibold text-primary hover:bg-slate-300 p-1 pb-2 px-4'>Delete</button>
                </div>
            </Typography>
      </Popover>
    </div>
    </ThemeProvider>
  );
}
