import Header from './component/Header/Header.jsx' 
import Hero from './component/Hero/Hero.jsx'
import Footer from './component/Footer/Footer.jsx'
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Years from './component/Years/Years.jsx';
import ArticlesByYear from './component/ArticlesByYear/ArticlesByYear.jsx';
import AddArticle from './component/AddArticle/AddArticle.jsx';
import Signin from './component/Auth/Signin.jsx';
import Signup from './component/Auth/Signup.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './Store/auth.js';
import OurGoals from './component/OurGoal/OurGoal.jsx';
import SingleUser from './component/SingleUser/SingleUser.jsx'
import MyProfile from './component/MyProfile/MyProfile.jsx';

function App() {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  // console.log(isLoggedIn)

  useEffect(()=>{
    if(
      localStorage.getItem("token")&&
      localStorage.getItem("user")
    ){

      dispatch(authActions.login())

    }
  },[dispatch])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<><Hero/><OurGoals/></>}/>
        <Route path='/year' element={isLoggedIn?<Years/>:<Signin/>}/>
        <Route path="/articles/:year" element={isLoggedIn?<ArticlesByYear/>:<Signin/>} />
        <Route path="/addArticle" element={isLoggedIn?<AddArticle/>:<Signin/>} />
        <Route path="/sign-in" element={<Signin/>} />
        <Route path="/sign-up" element={<Signup/>} />
        <Route path='/user/:id' element={isLoggedIn?<SingleUser/>:<Signin/>} />
        <Route path='/me' element={isLoggedIn?<MyProfile/>:<Signin/>}/>
      </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;
