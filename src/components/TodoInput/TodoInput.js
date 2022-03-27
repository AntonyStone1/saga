/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { useDispatch } from 'react-redux'
import { Box, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { createTodo } from '../../redux/actions/actionCreators'
import SignOut from '../Auth/Logout'

const CreateTodo = () => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const handleCreateTodo = (val) => {
    dispatch(createTodo(val))
    setInputValue('')
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 auto',
        maxWidth: '800px',
        mb: '20px',
      }}
    >
      <TextField
        id="todo-input"
        label="Create Todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) =>
          e.charCode === 13 ? handleCreateTodo(inputValue) : null
        }
        fullWidth
        style={{ maxWidth: '80%' }}
      />
      <Button
        onClick={() => handleCreateTodo(inputValue)}
        variant="contained"
        color="primary"
      >
        Add todo
      </Button>
      <SignOut />
    </Box>
  )
}

export default CreateTodo
