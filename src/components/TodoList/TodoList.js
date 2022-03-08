/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
import { useDispatch, useSelector } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Box, Checkbox, Typography } from '@material-ui/core'
import { v4 as uuid } from 'uuid'
import { toggleTodo, deleteTodo } from '../../redux/actions/actionCreators'

/* eslint-disable react/function-component-definition */
const TodoList = () => {
  const todos = useSelector((state) => state?.todos)
  const dispatch = useDispatch()
  const compliteHanlde = (e) => {
    dispatch(toggleTodo(e))
  }
  const deleteHandle = (e) => {
    dispatch(deleteTodo(e))
  }
  console.log(todos)

  return (
    <div>
      {todos?.length > 0 && (
        <Box
          sx={{
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {todos.map((item) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mb: '10px',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#fff',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              }}
              key={item?.id}
            >
              <Box sx={{ mr: 'auto' }} component="span">
                <Typography>{item?.value}</Typography>
              </Box>
              <Checkbox
                id={item?.id}
                checked={item?.complited}
                onChange={compliteHanlde}
                color="primary"
                sx={{ border: '10px solid black !important' }}
              />
              <DeleteForeverIcon
                id={item?.id}
                onClick={deleteHandle}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          ))}
        </Box>
      )}
    </div>
  )
}

export default TodoList
