import Aux from '../../hoc/aux'

const Layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </Aux>
)

export default Layout