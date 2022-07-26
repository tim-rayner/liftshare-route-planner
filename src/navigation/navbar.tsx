import { Navbar, NavbarBrand } from "reactstrap";

function NavigationBar(){
  return (
    <Navbar
      className="navigation-bar"
      color="primary"
      dark
    >
      <NavbarBrand href="/">
        Liftshare
      </NavbarBrand>
    </Navbar>
  )
}

export default NavigationBar; 