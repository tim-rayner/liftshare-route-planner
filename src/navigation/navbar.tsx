import { Navbar, NavbarBrand } from "reactstrap";


function NavigationBar(){
  return (
    <Navbar
      className="navigation-bar"
      color="primary"
      dark
    >
      <NavbarBrand href="/">
        liftshare
      </NavbarBrand>
    </Navbar>
  )
}

export default NavigationBar; 