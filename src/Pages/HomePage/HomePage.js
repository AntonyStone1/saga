/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { Container } from '@mui/material'
import TodoInput from '../../components/TodoInput'
import TodoList from '../../components/TodoList'

const HomePage = () => {
  return (
    <Container>
      <TodoInput />
      <TodoList />
    </Container>
  )
}

export default HomePage
