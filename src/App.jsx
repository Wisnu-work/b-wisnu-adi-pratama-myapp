import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProductPage from "./pages/Product/ProductPage"
import { UserProvider } from "./context/UserContext"
import ProductDetail from "./pages/ProductDetail/ProductDetail"
import HookForm from "./pages/HookForm/HookForm"
import ReactForm from "./pages/ReactForm/ReactForm"
import PostApp from "./pages/PostApp/PostApp"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/"  element={<ProductPage />}/>
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="*" element={<h1 className="flex w-full h-full text-center items-center justify-center text-4xl text-[#9EF40B   ]">NOT FOUND PAGE.</h1>} />
            <Route path="/hookform" element={<HookForm />}/>
            <Route path="/reactform" element={<ReactForm />}/>
            <Route path="/postapp" element={<PostApp />}/>
          </Routes>  
        </UserProvider>      
      </BrowserRouter>
    </>
  )
}

export default App


// Menghindari Prop drilling dengan HOC Higher Order Component
// const parentComponent = () => {
//   const data = 'celerates'
//   return <>
//       <MyCard>
//           <MyPhoto data={data} />
//       </MyCard>
//   </>
// }

// const MyCard = ({children}) => {
//   return <>
//           <p>Text 1</p>
//           {children}
//       </>
// }

// const MyPhoto = ({photo}) => {
//   return <>
//       <img src={photo} alt="" />
//   </>
// }