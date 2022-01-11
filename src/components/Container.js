import Header from './Header';

export default function Container({children}) {
  return (
    <div className="App">
      <Header />
      <div className="body">
      {children}
      </div>
    </div>
  )
}
